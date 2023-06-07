/** A storage for comments section. */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor, IComment } from "../../models/";
import { authorsConfig, commentsConfig } from "./CommentsRequests";

interface ICommentsState {
    commentsStorage: Record<number, IComment>
    authorsData: Record<number, IAuthor>
    currentPage: number,
    totalPages: number,
    commentsQuantity: number,
    likesQuantity: number,
    loading: boolean
}

const initialState: ICommentsState = {
    commentsStorage: {},
    authorsData: {},
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
        addLike: ( state, { payload }: PayloadAction<number> ) => {
            state.likesQuantity += 1;
            state.commentsStorage[ payload ].likes += 1;
        },
        removeLike: ( state, { payload }: PayloadAction<number> ) => {
            state.likesQuantity -= 1;
            state.commentsStorage[ payload ].likes -= 1;
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
                    const result: IComment[] = [];

                    state.totalPages = pagination.total_pages;
                    state.currentPage = pagination.page;
                    state.commentsQuantity += data.length;
                    state.likesQuantity += data.reduce( ( sum: number, comment: IComment ) => {
                        state.commentsStorage[ comment.id ] = comment;

                        return sum + comment.likes;
                    }, 0 );

                    data.forEach( ( comment: IComment ) => {
                        if ( comment.parent == null ) {
                            result.push( comment );
                        } else {
                            const children = state.commentsStorage[ comment.parent ].children || [];

                            children.push( comment );
                            state.commentsStorage[ comment.parent ].children = children;

                        }
                    } );
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