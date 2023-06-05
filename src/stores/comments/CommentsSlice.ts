/** A storage for comments section. */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor, IComment } from "../../pages";
import { authorsConfig, commentsConfig } from "./CommentsRequests";

interface ICommentsState {
    authorsData: Record<number, IAuthor>
    commentsData: IComment[],
    currentPage: number,
    totalPages: number,
    commentsQuantity: number,
    likesQuantity: number,
    loading: boolean
}

const initialState: ICommentsState = {
    authorsData: {},
    commentsData: [],
    currentPage: 0,
    totalPages: 2,
    commentsQuantity: 0,
    likesQuantity: 0,
    loading: false
};

export const commentsSlice = createSlice( {
    name: "comments",
    initialState,
    reducers: {
        addLike: ( state ) => {
            state.likesQuantity += 1;
        },
        removeLike: ( state ) => {
            state.likesQuantity -= 1;
        }
    },
    extraReducers: builder => {
        builder.addCase(
            commentsConfig.pending,
            ( state ) => {
                state.loading = true;
            }
        );
        builder.addCase(
            commentsConfig.fulfilled,
            ( state, { payload }: PayloadAction<any> ) => {
                state.loading = false;

                if ( payload && state.currentPage !== payload?.pagination?.page ) {
                    const { data, pagination } = payload;
                    const storage: any = {};
                    const result: IComment[] = [];

                    state.totalPages = pagination.total_pages;
                    state.currentPage = pagination.page;
                    state.commentsQuantity += data.length;
                    state.likesQuantity += data.reduce( ( sum: number, comment: IComment ) => {
                        storage[ comment.id ] = comment;

                        return sum + comment.likes;
                    }, 0 );

                    data.forEach( ( comment: IComment ) => {
                        if ( comment.parent == null ) {
                            result.push( comment );
                        } else {
                            const children = storage[ comment.parent ].children || [];

                            children.push( comment );
                            storage[ comment.parent ].children = children;

                        }
                    } );

                    state.commentsData = [
                        ...state.commentsData,
                        ...result.sort( ( a: IComment, b: IComment ) => {
                            return Date.parse( b.created ) - Date.parse( a.created );
                        } )
                    ];
                }
            }
        );
        builder.addCase(
            commentsConfig.rejected,
            ( state ) => {
                state.loading = false;
            }
        );
        builder.addCase(
            authorsConfig.pending,
            ( state ) => {
                state.loading = true;
            }
        );
        builder.addCase(
            authorsConfig.fulfilled,
            ( state, { payload }: PayloadAction<any> ) => {
                state.loading = false;
                if ( payload?.length ) {
                    payload.forEach( ( author: IAuthor ) => state.authorsData[ author.id ] = author );
                }
            }
        );
        builder.addCase(
            authorsConfig.rejected,
            ( state ) => {
                state.loading = false;
            }
        );
    }
} );

export const {
    addLike,
    removeLike
} = commentsSlice.actions;