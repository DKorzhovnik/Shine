using System;

namespace Shine.Data.Dto.Orders.Sell {
    public class OrderSellListDto {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public int PersonId { get; set; }
        public int EmployeeId { get; set; }
        public decimal Rating { get; set; }

        public string CustomerName { get; set; }
        public string EmployeeName { get; set; }

        public decimal Value { get; set; }
        public decimal Cost { get; set; }
    }
}