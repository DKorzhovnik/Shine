using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Shine.Data.Models.Config
{
    public class PersonConfig : IEntityTypeConfiguration<Person>
        {
            public void Configure(EntityTypeBuilder<Person> builder)
            {
                builder.HasDiscriminator(p => p.PersonType)
                    .HasValue<Employee>(PersonType.Employee)
                    .HasValue<Customer>(PersonType.Customer)
                    .HasValue<Supplier>(PersonType.Supplier);

                builder.Property(p => p.PersonType).Metadata
                    .AfterSaveBehavior = PropertySaveBehavior.Save;

                // builder.Property(p => p.DateOfBirth)
                //     .HasColumnType("date");
            }
        }
}
