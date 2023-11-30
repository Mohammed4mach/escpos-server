import Receipt from './Receipt.js';
import ShopInfo from './ShopInfo.js';

class OrderReceipt extends Receipt
{
    id;
    barcode;
    totalPrice;
    totalPriceBeforeDiscount;
    discount;
    paidPrice;
    remainPrice;
    buyerName;
    sellerName;
    shipperName;
    orderDate;
    orderTime;
    totalCount;
    totalModelCount;
    products;

    constructor(order)
    {
        super();

        this.id                       = order.id;
        this.barcode                  = order.barcode;
        this.totalPrice               = order.total_price;
        this.totalPriceBeforeDiscount = order.total_price_before_discount;
        this.discount                 = order.discount;
        this.paidPride                = order.paid_price;
        this.remainPrice              = order.remain_price;
        this.buyerName                = order.buyer_name;
        this.sellerName               = order.seller_name;
        this.shipperName              = order.shipper_name;
        this.orderDate                = order.order_date;
        this.orderTime                = order.order_time;
        this.totalCount               = order.total_count;
        this.totalModelCount          = order.total_model_count;
        this.products                 = order.products;
    }

    print()
    {
console.log(3);
        this.device.open(function(error) {
console.log(4);
            this.printer
            .font('a')
            .align('lt')
            .style('normal')
            .size(1, 1)
            .text(`${ShopInfo.name}        ${ShopInfo.tel}`).feed()
            .align('ct')
            .text('فاتورة بيع')
            .drawLine()
            .align('lt')
            .text(`Date  ${this.orderDate}    Time  ${this.orderTime}`).feed()
            .text(`Client            ${this.buyerName}`).feed()
            .text(`Seller            ${this.sellerName}`).feed()
            .text(`Shipping Company  ${this.shipperName}`).feed()
            .drawLine()
            .table(["Model", "Qty  Price", "Total"])

            const productsFormatted = [];
            this.products.foreach(product => {
                productsFormatted.push(
                    { text:product.name, align:"LEFT", width:0.33, style: 'B' },
                    { text:`${product.qty}  ${product.item_price}`, align:"CENTER", width:0.33 },
                    { text:product.total_price, align:"RIGHT", width:0.33 }
                );
            });

            this.printer
            .tableCustom(productsFormatted)
            .text(`Total               ${this.totalPriceBeforeDiscount}`).feed()
            .text(`Discount            ${this.discount}`).feed()
            .text(`Net                 ${this.totalPrice}`).feed(2)
            .text(`Paid                ${this.paidPrice}`).feed()
            .text(`Remaining           ${this.remainPrice}`).feed()
            .text(`Model(s) Count      ${this.remainPrice}`).feed()
            .barcode(this.barcode, 'EAN8')
            .size(2, 2)
            .text('Scan QR code')
            .qrimage('https://oneway.fashion', function(err) {
                this.cut();
                this.close();
            });
        });
    }
}

export default OrderReceipt;

