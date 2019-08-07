using System.Collections.Generic;
using System.Threading.Tasks;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Customers;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface ICustomerRepository : IRepository
    {
         #region Customer

        #region Get Values
        Task<IEnumerable<CustomerSelectDto>> GetCustomersSelectAsync();

        Task<PagedList<CustomerListDto>> GetPagedCustomersAsync(
            PagingParams pagingParams, SortParams sortParams, string filter);

        Task<CustomerDetailDto> GetCustomerAsync(int customerId);

        #endregion

        #region Actions
        Task AddCustomerAsync(Customer customer);

        Task<CustomerDto> UpdateCustomerAsync(Customer customer);

        Task<CustomerDto> DeleteCustomerAsync(int customerId);

        Task<bool> DeleteCustomersAsync(string[] ids);

        #endregion

        #endregion
    }
}