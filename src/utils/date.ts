import { format } from "date-fns";
import i18n from "i18next";
import { plural } from "./plural";
import { DATE_TEMPLATES } from "../constants/constants";

/**
 * The method parses date and returns particular date or difference between current date and dateValue.
 * @param dateValue - date in ISO 8601 UTC format.
 * @returns {string}
 */
export const dateParser = ( dateValue: string ) => {
    const difference: number = Date.parse( new Date().toISOString() ) - Date.parse( dateValue );
    const agoText = i18n.t( "date.ago" );

    const hours = Math.floor( difference / 1000 / 60 / 60 );

    if ( hours > 24 ) {
        return format( new Date( dateValue ), DATE_TEMPLATES.COMMENTS );
    } else if ( hours >= 1 ) {
        return `${ hours } ${ i18n.t( `date.hour.${ plural( hours ) }` ) } ${ agoText }`;
    } else {
        const minutes = Math.floor( difference / 1000 / 60 );

        return `${ minutes } ${ i18n.t( `date.minuteDeclension.${ plural( minutes ) }` ) } ${ agoText }`;
        //Todo Add seconds parsing case if it is needed.
    }
};