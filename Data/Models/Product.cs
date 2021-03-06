using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using Shine.Data.Models.Interfaces;

namespace Shine.Data.Models {
    public abstract class Product : IAuditedEntityBase, ISoftDelete {
#region Properties
        public int ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }
        public string Specification { get; set; }
        public bool ProductType { get; set; }
#endregion

#region FK
        public int CategoryId { get; set; }
#endregion

#region Navigation Properties
        public Category Category { get; set; }
        public IEnumerable<Photo> Photos { get; set; }
        public IEnumerable<ProductOrder> ProductOrders { get; set; }
        public IEnumerable<PersonProduct> PersonProducts { get; set; }
        public IEnumerable<StorageProduct> StorageProducts { get; set; }

#endregion
    }

    public class ProductBuy : Product, INotRoot {

    }

    public class ProductSell : Product, INotRoot {

    }
}
