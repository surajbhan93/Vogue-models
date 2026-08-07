// app/admin/AdminContact/AdminContactContent.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useAdmin } from '@/context/AdminContext';
import './AdminContact.css';

// ============================================
// 🔹 TYPES
// ============================================

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: 'general' | 'booking' | 'collaboration' | 'support' | 'feedback' | 'other';
  status: 'pending' | 'read' | 'replied' | 'resolved' | 'spam';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  pending: number;
  replied: number;
  resolved: number;
  spam: number;
  unread: number;
  today: number;
  week: number;
  categories: Array<{ _id: string; count: number }>;
}

interface FilterState {
  status: string;
  category: string;
  search: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ============================================
// 🔹 COMPONENT
// ============================================

const AdminContactContent: React.FC = () => {
  const { token, isAuthenticated } = useAdmin();
  
  // ============================================
  // 🔹 STATE
  // ============================================
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [showReplyModal, setShowReplyModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterState>({
    status: '',
    category: '',
    search: '',
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // ============================================
  // 🔹 AXIOS CONFIG
  // ============================================
//   const API_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api/contact';
const API_URL: string = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004/api'}/contact`;

  // Set auth token for all requests
  useEffect(() => {
    const currentToken = localStorage.getItem('accessToken');
    if (currentToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
    }
  }, [token]);

  // ============================================
  // 🔹 FETCH CONTACTS
  // ============================================
  const fetchContacts = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const params: Record<string, any> = {
        page: pagination.page,
        limit: pagination.limit,
        ...filter,
      };
      
      Object.keys(params).forEach((key: string) => {
        if (params[key] === '' || params[key] === undefined || params[key] === null) {
          delete params[key];
        }
      });

      const response = await axios.get<{ success: boolean; data: Contact[]; pagination: PaginationState }>(API_URL, { params });
      
      if (response.data.success) {
        setContacts(response.data.data || []);
        setPagination({
          ...pagination,
          total: response.data.pagination?.total || 0,
          pages: response.data.pagination?.pages || 0,
        });
      } else {
        setError('Failed to load contacts');
      }
    } catch (err) {
      console.error('Fetch contacts error:', err);
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        setError('You do not have permission to view contacts.');
      } else {
        setError((error.response?.data as any)?.message || 'Failed to load contacts. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filter, isAuthenticated]);

  // ============================================
  // 🔹 FETCH STATS
  // ============================================
  const fetchStats = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.get<{ success: boolean; stats: Stats }>(`${API_URL}/stats`);
      if (response.data.success) {
        setStats(response.data.stats || {});
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
      setStats({
        total: 0,
        pending: 0,
        replied: 0,
        resolved: 0,
        spam: 0,
        unread: 0,
        today: 0,
        week: 0,
        categories: [],
      });
    }
  }, [isAuthenticated]);

  // ============================================
  // 🔹 REPLY TO CONTACT
  // ============================================
  const handleReply = async (): Promise<void> => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }

    if (!selectedContact) {
      alert('No contact selected');
      return;
    }

    try {
      setActionLoading(true);
      const response = await axios.post<{ success: boolean; message: string }>(
        `${API_URL}/${selectedContact._id}/reply`,
        { message: replyMessage.trim() }
      );
      
      if (response.data.success) {
        alert('✅ Reply sent successfully!');
        setShowReplyModal(false);
        setReplyMessage('');
        setSelectedContact(null);
        await fetchContacts();
        await fetchStats();
      } else {
        alert(response.data.message || 'Failed to send reply');
      }
    } catch (err) {
      console.error('Reply error:', err);
      const error = err as AxiosError;
      alert((error.response?.data as any)?.message || 'Failed to send reply. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================
  // 🔹 UPDATE STATUS
  // ============================================
  const updateStatus = async (id: string, status: string): Promise<void> => {
    if (!id) return;

    try {
      setActionLoading(true);
      const response = await axios.patch<{ success: boolean; message: string }>(
        `${API_URL}/${id}/status`,
        { status }
      );
      
      if (response.data.success) {
        await fetchContacts();
        await fetchStats();
      } else {
        alert(response.data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update status error:', err);
      const error = err as AxiosError;
      alert((error.response?.data as any)?.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================
  // 🔹 DELETE CONTACT
  // ============================================
  const deleteContact = async (id: string): Promise<void> => {
    if (!id) return;
    if (!window.confirm('⚠️ Are you sure you want to delete this message?')) return;

    try {
      setActionLoading(true);
      const response = await axios.delete<{ success: boolean; message: string }>(`${API_URL}/${id}`);
      
      if (response.data.success) {
        alert('🗑️ Contact deleted successfully!');
        await fetchContacts();
        await fetchStats();
      } else {
        alert(response.data.message || 'Failed to delete contact');
      }
    } catch (err) {
      console.error('Delete error:', err);
      const error = err as AxiosError;
      alert((error.response?.data as any)?.message || 'Failed to delete contact');
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================
  // 🔹 OPEN REPLY MODAL
  // ============================================
  const openReplyModal = (contact: Contact): void => {
    if (!contact) return;
    setSelectedContact(contact);
    setReplyMessage('');
    setShowReplyModal(true);
  };

  // ============================================
  // 🔹 CLOSE REPLY MODAL
  // ============================================
  const closeReplyModal = (): void => {
    setShowReplyModal(false);
    setSelectedContact(null);
    setReplyMessage('');
  };

  // ============================================
  // 🔹 GET STATUS BADGE COLOR
  // ============================================
  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#f39c12',
      read: '#3498db',
      replied: '#2ecc71',
      resolved: '#27ae60',
      spam: '#e74c3c',
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: 'Pending',
      read: 'Read',
      replied: 'Replied',
      resolved: 'Resolved',
      spam: 'Spam',
    };
    return labels[status] || status;
  };

  // ============================================
  // 🔹 GET CATEGORY LABEL
  // ============================================
  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      general: 'General',
      booking: 'Booking',
      collaboration: 'Collaboration',
      support: 'Support',
      feedback: 'Feedback',
      other: 'Other',
    };
    return labels[category] || category;
  };

  // ============================================
  // 🔹 GET CATEGORY COLOR
  // ============================================
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      general: '#6c757d',
      booking: '#007bff',
      collaboration: '#28a745',
      support: '#fd7e14',
      feedback: '#6f42c1',
      other: '#17a2b8',
    };
    return colors[category] || '#6c757d';
  };

  // ============================================
  // 🔹 FORMAT DATE
  // ============================================
  const formatDate = (date: string): string => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // ============================================
  // 🔹 HANDLE FILTER CHANGE
  // ============================================
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]): void => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // ============================================
  // 🔹 CLEAR FILTERS
  // ============================================
  const clearFilters = (): void => {
    setFilter({ status: '', category: '', search: '' });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // ============================================
  // 🔹 LOAD DATA
  // ============================================
  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
      fetchStats();
    }
  }, [isAuthenticated, fetchContacts, fetchStats]);

  // ============================================
  // 🔹 AUTH CHECK
  // ============================================
  if (!isAuthenticated) {
    return (
      <div className="admin-contact-auth-error">
        <div className="auth-error-content">
          <span className="auth-error-icon">🔒</span>
          <h2>Authentication Required</h2>
          <p>Please login to access the contact management panel.</p>
        </div>
      </div>
    );
  }

  // ============================================
  // 🔹 LOADING STATE
  // ============================================
  if (loading && contacts.length === 0) {
    return (
      <div className="admin-contact-loading">
        <div className="spinner"></div>
        <p>Loading contacts...</p>
      </div>
    );
  }

  // ============================================
  // 🔹 RENDER
  // ============================================
  return (
    <div className="admin-contact-container">
      <div className="admin-contact-header">
        <div>
          <h1>📬 Contact Messages</h1>
          <p className="header-subtitle">Manage all incoming messages from users</p>
        </div>
        <div className="admin-contact-actions">
          <button 
            onClick={() => { fetchContacts(); fetchStats(); }} 
            className="btn-refresh"
            disabled={actionLoading}
          >
            {actionLoading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="admin-contact-error">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button onClick={() => setError('')} className="error-close">✕</button>
        </div>
      )}

      {stats && (
        <div className="admin-contact-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-value">{stats.total || 0}</span>
              <span className="stat-label">Total Messages</span>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <span className="stat-value">{stats.pending || 0}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card replied">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{stats.replied || 0}</span>
              <span className="stat-label">Replied</span>
            </div>
          </div>
          <div className="stat-card resolved">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <span className="stat-value">{stats.resolved || 0}</span>
              <span className="stat-label">Resolved</span>
            </div>
          </div>
          <div className="stat-card unread">
            <div className="stat-icon">📨</div>
            <div className="stat-info">
              <span className="stat-value">{stats.unread || 0}</span>
              <span className="stat-label">Unread</span>
            </div>
          </div>
          <div className="stat-card spam">
            <div className="stat-icon">🚫</div>
            <div className="stat-info">
              <span className="stat-value">{stats.spam || 0}</span>
              <span className="stat-label">Spam</span>
            </div>
          </div>
        </div>
      )}

      <div className="admin-contact-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="🔍 Search by name, email, subject..."
            value={filter.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="filter-search"
          />
        </div>
        <div className="filter-group">
          <select
            value={filter.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="pending">⏳ Pending</option>
            <option value="read">📖 Read</option>
            <option value="replied">✅ Replied</option>
            <option value="resolved">🎯 Resolved</option>
            <option value="spam">🚫 Spam</option>
          </select>
        </div>
        <div className="filter-group">
          <select
            value={filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="booking">Booking</option>
            <option value="collaboration">Collaboration</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button onClick={clearFilters} className="btn-clear-filters">
          ✕ Clear
        </button>
      </div>

      <div className="admin-contact-table-wrapper">
        <table className="admin-contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
                  <div className="empty-state">
                    <span className="empty-icon">📭</span>
                    <p>No messages found</p>
                    <p className="empty-sub">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr
                  key={contact._id || index}
                  className={!contact.isRead ? 'unread' : ''}
                >
                  <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                  <td>
                    <div className="contact-name">
                      <span className="name">{contact.name || 'Unknown'}</span>
                      {!contact.isRead && <span className="badge-new">New</span>}
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${contact.email}`} className="contact-email">
                      {contact.email || 'N/A'}
                    </a>
                  </td>
                  <td className="contact-subject">{contact.subject || 'No Subject'}</td>
                  <td>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(contact.category) }}
                    >
                      {getCategoryLabel(contact.category)}
                    </span>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(contact.status) }}
                    >
                      {getStatusLabel(contact.status)}
                    </span>
                  </td>
                  <td className="contact-date">{formatDate(contact.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => openReplyModal(contact)}
                        className="btn-reply"
                        title="Reply"
                        disabled={actionLoading}
                      >
                        💬
                      </button>
                      <button
                        onClick={() => {
                          const statuses = ['pending', 'read', 'replied', 'resolved', 'spam'];
                          const currentIndex = statuses.indexOf(contact.status);
                          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                          updateStatus(contact._id, nextStatus);
                        }}
                        className="btn-status"
                        title="Change Status"
                        disabled={actionLoading}
                      >
                        🔄
                      </button>
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className="btn-delete"
                        title="Delete"
                        disabled={actionLoading}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="admin-contact-pagination">
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1 || actionLoading}
            className="btn-page"
          >
            ← Previous
          </button>
          <span className="page-info">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </span>
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages || actionLoading}
            className="btn-page"
          >
            Next →
          </button>
        </div>
      )}

      {showReplyModal && selectedContact && (
        <div className="modal-overlay" onClick={closeReplyModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💬 Reply to {selectedContact.name || 'User'}</h2>
              <button className="modal-close" onClick={closeReplyModal}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="original-message">
                <h4>📝 Original Message:</h4>
                <p><strong>Subject:</strong> {selectedContact.subject || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedContact.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {selectedContact.phone || 'N/A'}</p>
                <p><strong>Category:</strong> {getCategoryLabel(selectedContact.category)}</p>
                <div className="message-content">
                  <p>{selectedContact.message || 'No message content'}</p>
                </div>
              </div>

              <div className="reply-form">
                <label htmlFor="replyMessage">✏️ Your Reply:</label>
                <textarea
                  id="replyMessage"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={5}
                  disabled={actionLoading}
                />
                <small className="reply-hint">
                  {replyMessage.length}/1000 characters
                </small>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={closeReplyModal}
                className="btn-cancel"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                className="btn-send-reply"
                disabled={!replyMessage.trim() || actionLoading}
              >
                {actionLoading ? '⏳ Sending...' : '📤 Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactContent;