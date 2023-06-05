/** The module keeps request methods for comments section. */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import i18n from "i18next";

import getCommentsRequest from "../../api/comments/getCommentsRequest";
import getAuthorsRequest from "../../api/authors/getAuthorsRequest";

/**
 * The method execute request to get comments data for particular page.
 * @param pageNumber - number of loading page in comment section.
 * @return {Promise<IComment[]>}
 * */
export const commentsConfig = createAsyncThunk(
    "comments/getComments",
    async ( pageNumber: number, reject ) => {
        try {
            return await getCommentsRequest( pageNumber );
        } catch ( e ) {
            toast.error( i18n.t( "errors.commentsLoad" ), {
                position: toast.POSITION.TOP_RIGHT
            } );
            return reject.rejectWithValue( i18n.t( "errors.commentsLoad" ) );
        }
    }
);

/**
 * The method execute request to get authors data.
 * @return {Promise<IAuthor[]>}
 * */
export const authorsConfig = createAsyncThunk(
    "comments/getAuthors",
    async ( _, reject ) => {
        try {
            return await getAuthorsRequest();
        } catch ( e ) {
            return reject.rejectWithValue( i18n.t( "errors.authorsLoad" ) );
        }
    }
);