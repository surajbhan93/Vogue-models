import mongoose from 'mongoose';
import { connectMongoDB } from '../../../config/database';
import { RoleModel } from '../models/Role';
import { PermissionModel } from '../models/Permission';
import { UserModel } from '../models/User';
import { AdminModel } from '../models/Admin';
import { CategoryModel } from '../models/Category';
import { FAQModel } from '../models/FAQ';
import { ServiceModel } from '../models/Service';
import { SystemSettingModel } from '../models/ContactMessage';

const seed = async () => {
  await connectMongoDB();
  console.log('[Seed Engine] Wiping existing system collections for clean initialization...');

  await Promise.all([
    RoleModel.deleteMany({}),
    PermissionModel.deleteMany({}),
    UserModel.deleteMany({}),
    AdminModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    FAQModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    SystemSettingModel.deleteMany({}),
  ]);

  console.log('[Seed Engine] Creating System Permissions...');
  const permissions = await PermissionModel.insertMany([
    { action: 'models:create', resource: 'ModelProfile', description: 'Create model profiles' },
    { action: 'models:read', resource: 'ModelProfile', description: 'View model profiles' },
    { action: 'bookings:create', resource: 'Booking', description: 'Create booking requests' },
    { action: 'admin:all', resource: 'System', description: 'Super Admin full privileges' },
  ]);

  console.log('[Seed Engine] Seeding Core Roles...');
  const superAdminRole = await RoleModel.create({
    name: 'SUPER_ADMIN',
    description: 'Full system privileges',
    permissions: permissions.map((p) => p._id),
  });

  const adminRole = await RoleModel.create({
    name: 'ADMIN',
    description: 'Agency administrator',
    permissions: permissions.filter((p) => p.action.startsWith('models')).map((p) => p._id),
  });

  const modelRole = await RoleModel.create({
    name: 'MODEL',
    description: 'Registered agency model',
    permissions: [],
  });

  const clientRole = await RoleModel.create({
    name: 'CLIENT',
    description: 'Hiring client or agency customer',
    permissions: [],
  });

  await RoleModel.create({
    name: 'GUEST',
    description: 'Public unauthenticated visitor',
    permissions: [],
  });

  console.log('[Seed Engine] Seeding SuperAdmin Account...');
  const superAdminUser = await UserModel.create({
    email: 'admin@vogueagency.com',
    passwordHash: 'AdminPass123!',
    role: superAdminRole._id,
    roleName: 'SUPER_ADMIN',
    isEmailVerified: true,
    isActive: true,
  });

  await AdminModel.create({
    user: superAdminUser._id,
    firstName: 'System',
    lastName: 'Administrator',
    department: 'Executive Board',
  });

  console.log('[Seed Engine] Seeding Modeling Categories...');
  await CategoryModel.insertMany([
    { name: 'High Fashion & Runway', slug: 'high-fashion-runway', description: 'Couture and international runway models' },
    { name: 'Commercial & Print', slug: 'commercial-print', description: 'Brand campaigns, catalogues, and advertising' },
    { name: 'Fitness & Athletic', slug: 'fitness-athletic', description: 'Sports brands and activewear modeling' },
    { name: 'Editorial & Glamour', slug: 'editorial-glamour', description: 'Magazine covers and creative editorial shoots' },
  ]);

  console.log('[Seed Engine] Seeding Platform Services...');
  await ServiceModel.insertMany([
    { title: 'Runway & Fashion Shows', slug: 'runway-fashion-shows', description: 'Top tier models for fashion weeks and private brand launches.' },
    { title: 'Commercial Video & TV Ads', slug: 'commercial-video-tv-ads', description: 'Professional talent for television, digital, and streaming commercials.' },
    { title: 'Brand Ambassador Services', slug: 'brand-ambassador-services', description: 'Influential models for long term brand endorsement campaigns.' },
  ]);

  console.log('[Seed Engine] Database seeding complete!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('[Seed Error]', err);
  process.exit(1);
});
