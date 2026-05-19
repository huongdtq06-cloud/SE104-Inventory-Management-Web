import axiosClient from './axiosClient';
import { type ManagerDashboardData } from '../types/dashboard/manager';
import { type StaffDashboardData } from '../types/dashboard/staff';

const dashboardApi = {
  getManager(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/dashboard/manager`;
    return axiosClient.get<ManagerDashboardData>(url);
  },

  getStaff(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/dashboard/staff`;
    return axiosClient.get<StaffDashboardData>(url);
  },
};

export default dashboardApi;
