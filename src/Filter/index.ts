import { Filters } from './Filters';
import { Flags } from './Flags';

function isPrimitive(value: any): boolean {
    return value !== Object(value);
}

export default function filter_var(input: any, filter: Filters, options?: Flags) {
    if (!filter) {
        filter = Filters.FILTER_DEFAULT;
    }

    const flags = options || 0;

    // tslint:disable-next-line: no-bitwise
    const failure  = (flags & Flags.FILTER_NULL_ON_FAILURE) ? null : false;

    let data = typeof input === "string" ? input.replace(/(^\s+)|(\s+$)/g, '') : input;

    switch(filter) {
        case Filters.FILTER_VALIDATE_BOOLEAN:
            return /^(?:1|true|yes|on)$/i.test(data) || (/^(?:0|false|no|off)$/i.test(data) ? false : failure);
        case Filters.FILTER_SANITIZE_NUMBER_INT:
            return ('' + input).replace(/[^\d+\-]/g, '');
        case Filters.FILTER_DEFAULT:
        // is alias of FILTER_UNSAFE_RAW
        // fall-through
        case Filters.FILTER_UNSAFE_RAW:
            data = input + '';
    
            // tslint:disable-next-line: no-bitwise
            if (flags & Flags.FILTER_FLAG_ENCODE_AMP) {
            data = data.replace(/&/g, '&#38');
            }
    
            // tslint:disable-next-line: no-bitwise
            if ((Flags.FILTER_FLAG_ENCODE_LOW |
                Flags.FILTER_FLAG_STRIP_LOW |
                Flags.FILTER_FLAG_ENCODE_HIGH |
                Flags.FILTER_FLAG_STRIP_HIGH) &
                flags) {
    
            data = data.replace(/[\s\S]/g,
                (c: any) => {
                    const charCode = c.charCodeAt(0);
    
                    if (charCode < 32) {
                    // tslint:disable-next-line: no-bitwise
                    return (flags & Flags.FILTER_FLAG_STRIP_LOW) ? '' :
                        // tslint:disable-next-line: no-bitwise
                        (flags & Flags.FILTER_FLAG_ENCODE_LOW) ? '&#' + charCode : c;
                    } else if (charCode > 127) {
                    // tslint:disable-next-line: no-bitwise
                    return (flags & Flags.FILTER_FLAG_STRIP_HIGH) ? '' : (flags & Flags.FILTER_FLAG_ENCODE_HIGH) ? '&#' + charCode : c;
                    }
    
                    return c;
                });
            }
    
            return data;
        default:
            return false;
    }
}

export { Filters } from './Filters';
export { Flags } from './Flags';