using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Shine.Data.Dto.Orders.Buy;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Interfaces
{
    public interface IOrderBuyRepository : IRepository
    {
#region Sync
        IEnumerable<OrderBuyDto> GetOrders();
        OrderBuyDto GetOrder(int id);
        void UpdateOrder(OrderBuy orderBuy);
        void DeleteOrder(int id);
#endregion

#region Async
        Task<IEnumerable<OrderBuyDto>> GetOrdersAsync(Expression<Func<OrderBuyDto, object>> orderBy);
        Task<OrderBuyDto> GetOrderAsync(int id);
        Task<OrderBuy> AddOrderAsync(OrderBuy orderBuy);

#region ProductsOrder
        Task<IEnumerable<ProductOrderDto>> GetProductDetailByOrder(int id);
        Task<ProductOrder> AddProductOrderAsync(ProductOrder productOrder);
        Task AddProductOrderRangeAsync(IEnumerable<ProductOrder> productOrders);
        Task DeleteProductOrder(int orderId, int productId);

#endregion

#endregion
    }
}
