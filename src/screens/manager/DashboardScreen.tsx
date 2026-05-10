import StatsCards from '../../features/dashboard/StatsCards';
import LowStockAlert from '../../features/dashboard/LowStockAlert';
import ProductCategoryChart from '../../features/dashboard/manager/ProductCategoryChart';
import RecentActivities from '../../features/dashboard/manager/RecentActivities';
import RevenueChart from '../../features/dashboard/manager/RevenueChart';
import TopProducts from '../../features/dashboard/manager/TopProducts';
import { useDashboard } from '../../hooks/useDashboard';

const DashboardManagerScreen = () => {
  const { manager } = useDashboard();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Here's what's happening today.</p>
      </div>

      <StatsCards stats={manager.stats} />

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="col-span-3">
          <RevenueChart revenueByYear={manager.revenueByYear} />
        </div>
        <div className="col-span-2">
          <ProductCategoryChart categories={manager.productCategories} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <TopProducts topProductsByYear={manager.topProductsByYear} />
        <LowStockAlert items={manager.lowStockItems} />
      </div>
      <RecentActivities activities={manager.recentActivities} />
    </div>
  );
};

export default DashboardManagerScreen;
