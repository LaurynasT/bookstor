namespace bookstore;

public class ReservationService
{
    public decimal TotalCost (int days, string? type, bool quickPickup)
    {

    decimal dailyRate = type =="Audiobook" ? 3 : 2;
    decimal total = days * dailyRate;

    if (days>10)
    {
        total *=0.8m;
    }
    else if (days > 3)
    {
        total *=0.9m;
    }
    total +=3;

    if(quickPickup)
    {
        total +=5;
    }
    return total;
    }
}

