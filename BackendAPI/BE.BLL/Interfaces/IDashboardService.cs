namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO.Dashboard;

public interface IDashboardService
{
    Task<ManagerDashboardDTO> GetManagerDashboardAsync(int warehouseId, int userId, CancellationToken cancellationToken = default);
    Task<StaffDashboardDTO> GetStaffDashboardAsync(int warehouseId, int userId, CancellationToken cancellationToken = default);
}
