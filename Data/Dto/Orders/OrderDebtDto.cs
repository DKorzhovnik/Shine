using System;

namespace Shine.Data.Dto.Orders
{
    public class OrderDebtDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime TimeForPayment { get; set; }
        public decimal Debt { get; set; }
    }
}