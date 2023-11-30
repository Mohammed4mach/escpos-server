import Escpos from 'escpos';
import USB from 'escpos-usb';

class Receipt
{
    #driver;
    #device;
    #options;
    #printer;

    constructor(options = { encoding: 'UTF-8' }, device = null)
    {
        this.#driver  = Escpos;
        this.#device  = device != null ? device : new USB();
        this.#printer = new Escpos.Printer(this.#device, options);
        this.#options = options;
    }

    get driver()
    {
        return this.#driver;
    }

    get options()
    {
        return this.#options;
    }

    get device()
    {
        return this.#device;
    }

    get printer()
    {
        return this.#printer;
    }
};

export default Receipt;

