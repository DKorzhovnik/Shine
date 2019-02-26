using Mapster;

using Shine.Data.Dto.Suppliers;
using Shine.Data.Models;

namespace Shine.Data.Dto._Mapster
{
    public static class SupplierSetting
    {
        public static void Setting()
        {
            // Map CountryName
            TypeAdapterConfig<Supplier, SupplierListDto>.NewConfig()
                .Map(
                    dest => dest.CountryName, src => src.Country.CountryName
                ).Map(
                    dest => dest.ContinentName, src => src.Country.ContinentName
                );

        }
    }
}