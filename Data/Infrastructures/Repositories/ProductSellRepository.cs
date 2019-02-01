using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Data.Infrastructures.Repositories
{
    public class ProductSellRepository : Repository<ProductSell>, IProductSellRepository
    {
        private readonly AppDbContext _context;

        public ProductSellRepository(AppDbContext context) : base(context)
        {
            this._context = context;
        }

        public IEnumerable<ProductSellListDto> GetProducts()
        {
            var query = _context.Products.Include(p => p.Category).Select(p => new
            {
                p.ProductId,
                p.Name,
                p.Specification,
                p.Price,
                p.Category.CategoryName
            }).AsNoTracking();

            return query.Adapt<IEnumerable<ProductSellListDto>>();
        }        
    }
}