// gọi DashboardService để tính dữ liệu cho Dashboard Screen
import { useMemo } from 'react';
import { useNotes } from '../context/NoteContext';
import { MOCK_PRODUCTS } from '../data/MOCK_PRODUCTS';
import { MOCK_STAFF } from '../data/MOCK_STAFF';
import { DashboardService } from '../services/DashboardService';
import { useProducts } from './useProducts';
import { useShifts } from './useShifts';
import { useStaff } from './useStaffs';
import { useAuth } from '../context/AuthContext';

export const useDashboard = () => {
  const { products } = useProducts(MOCK_PRODUCTS);
  const { staffs } = useStaff(MOCK_STAFF);
  const { shifts } = useShifts(); 
  const { allNotes, getDeliveries } = useNotes();
  const { user } = useAuth();

  const deliveries = getDeliveries();

  return useMemo(() => {
    const lowStockItems = DashboardService.getLowStockAlerts(products);
    const recentActivities = DashboardService.getRecentActivities(allNotes, shifts, user?.userName);
    const productCategories = DashboardService.getCategoryDistribution(products);
    const revenueByYear = DashboardService.getYearlyFinancialStatsList(deliveries, products);
    const topProductsByYear = DashboardService.getTopProducts(deliveries, products);

    return {
      manager: {
        stats: DashboardService.getManagerStats(products, allNotes, deliveries),
        lowStockItems,
        recentActivities,
        productCategories,
        revenueByYear,
        topProductsByYear,
      },
      staff: {
        stats: DashboardService.getStaffStats(products, allNotes, staffs),
        lowStockItems,
        inventoryTrend: DashboardService.getInventoryTrend(allNotes, products),
        weeklySchedule: DashboardService.getWeeklySchedule(shifts, user?.userName),
        infractions: DashboardService.getInfractions(staffs, user?.userName),
        recentActivities: DashboardService.getStaffRecentActivities(allNotes, user?.userName),
        noteEntries: DashboardService.getNoteEntries(allNotes, user?.userName),
      },
    };
  }, [allNotes, deliveries, products, shifts, staffs]);
};
