import React, { useEffect } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { RootState, useAppDispatch, authorsConfig, commentsConfig } from "../../stores/";
import { HFlexBox, VFlexBox, Button, Icon, LoadingIcon } from "../../components/";
import { plural } from "../../utils/";
import { IComment } from "../../models/";
import greyHeart from "../../assets/icons/heartGrey.svg";
import { Comment } from "./Comment";

const CommentsSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 5px;
`;

const CommentsHeaderStyle = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.2px #767676 solid;
  padding-bottom: 8px;

  width: 562px;
  margin-top: 32px;

  @media screen and (max-width: 610px) {
    width: 100%;
    margin-top: 32px;
  }
`;

const CommentsMainStyle = styled( VFlexBox )`
  width: 562px;

  @media screen and (max-width: 610px) {
    width: 100%;
  }
`;

const CommentsMainInnerStyle = styled( VFlexBox )`
  > :last-child {
    margin-bottom: 64px;
  }
`;

const LoadButtonStyle = styled( Button )`
  @media (hover: none) and (pointer: coarse) and (orientation: portrait) {
    margin-top: 40px;
  }
`;

/**
 * Method returns comments and nested comments of them.
 * ../../param comments - a list of comments.
 * ../../param level - a nested level.
 * */
const getComments = ( comments: IComment[], level: number = 0 ): JSX.Element[] => {
    return comments.map( ( commentData: IComment ) => {
        return (
            <React.Fragment key = { commentData.id }>
                <Comment
                    comment = { commentData }
                    nestedLevel = { level }
                />
                {
                    commentData.children?.length &&
                    getComments( commentData.children, ++level )
                }
            </React.Fragment>
        );
    } );
};

const useWordSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Comments = () => {
    const commentsStorage = useWordSelector( ( state ) => state.comments.commentsStorage );
    const currentPage = useWordSelector( ( state ) => state.comments.currentPage );
    const totalPages = useWordSelector( ( state ) => state.comments.totalPages );
    const commentsQuantity = useWordSelector( ( state ) => state.comments.commentsQuantity );
    const likesQuantity = useWordSelector( ( state ) => state.comments.likesQuantity );
    const isLoading = useWordSelector( ( state ) => state.comments.loading );
    const comments = Object.values( commentsStorage )
        .filter( ( el ) => el.parent == null )
        .sort( ( a: IComment, b: IComment ) => {
            return Date.parse( b.created ) - Date.parse( a.created );
        } );

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const commentsQuantityTitle: string = t( `comments.commentsTitles.${ plural( commentsQuantity ) }` );

    /** Method loads next page of comments. */
    const loadComments = () => {
        dispatch( commentsConfig( currentPage + 1 ) );
    };

    useEffect( () => {
        dispatch( authorsConfig() );
        loadComments();
    }, [] );

    return (
        <CommentsSectionStyle>
            <HFlexBox padding = "0 24px">
                <CommentsHeaderStyle>
                    <div>
                        { ` ${ commentsQuantity } ${ commentsQuantityTitle }` }
                    </div>
                    <HFlexBox>
                        <Icon
                            alt = "likes"
                            src = { greyHeart }
                            style = { { marginRight: 8 } }
                        />
                        { likesQuantity }
                    </HFlexBox>
                </CommentsHeaderStyle>
            </HFlexBox>
            <HFlexBox overflow = "auto" padding = "0 24px">
                <CommentsMainStyle>
                    <CommentsMainInnerStyle>
                        {
                            !!comments?.length && getComments( comments )
                        }
                        {
                            currentPage < totalPages && !isLoading &&
                            <HFlexBox>
                                <LoadButtonStyle
                                    width = { 234 }
                                    height = { 36 }
                                    margin = "60px 0 0 0"
                                    bg = "#313439"
                                    disabled = { isLoading }
                                    onClick = { loadComments }
                                >
                                    { t( "comments.loadMoreBtnTitle" ) }
                                </LoadButtonStyle>
                            </HFlexBox>
                        }
                        {
                            isLoading &&
                            <HFlexBox margin = "30px 0">
                                <LoadingIcon />
                            </HFlexBox>
                        }
                    </CommentsMainInnerStyle>
                </CommentsMainStyle>
            </HFlexBox>
        </CommentsSectionStyle>
    );
};
