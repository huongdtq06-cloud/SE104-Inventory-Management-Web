namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DamageItemConfiguration : IEntityTypeConfiguration<DamageItem>
{
    public void Configure(EntityTypeBuilder<DamageItem> builder)
    {
        builder.HasOne(di => di.DamageNote)
            .WithMany(dn => dn.DamageItems)
            .HasForeignKey(di => di.NoteId)
            .OnDelete(DeleteBehavior.Cascade); // tự động xoá toàn bộ DamageItems liên quan

        builder.HasOne(di => di.Product)
            .WithMany(p => p.DamageItems)
            .HasForeignKey(di => di.ProductId)
            .OnDelete(DeleteBehavior.Restrict); //KHÔNG cho xoá Product nếu còn DamageItem tham chiếu tới nó

        builder.HasData(
            new DamageItem { DamageItemId = 1, NoteId = 3, ProductId = 2, Quantity = 1, Reason = "Broken" } 
            //EF Core sẽ tự insert dữ liệu mẫu khi migration/update database.
        );
    }
}
