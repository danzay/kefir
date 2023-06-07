import React from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import styled from "styled-components";

import { IComment, IAuthor } from "../../models/";
import { addLike, removeLike, RootState, useAppDispatch } from "../../stores/";
import { Avatar, ToggleButton, HFlexBox, Box } from "../../components/";
import { dateParser } from "../../utils/";

import heartEmptyIcon from "../../assets/icons/heartEmpty.svg";
import heartFullIcon from "../../assets/icons/heartFull.svg";

interface ICommentProps {
    comment: IComment,
    nestedLevel?: number
}

const AuthorStyle = styled.div`
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentStyle = styled.div<{ level: number }>`
  display: flex;
  margin-top: 32px;
  padding-left: ${ ( props ) => props.level * 34 }px;

  //todo It is how I handle a case, when there is many nested comments.
  // But in the cases like this it is better to discuss it with designers.
  min-width: 300px;
  overflow: auto;

  @media (hover: none) and (pointer: coarse) and (orientation: portrait) {
    margin-top: 24px;
    padding-left: ${ ( props ) => props.level * 20 }px;
  }
`;

const useWordSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Comment = ( { comment, nestedLevel }: ICommentProps ) => {
    const authors = useWordSelector( ( state ) => state.comments.authorsData );
    const { id, text, likes, created, author } = comment;
    const authorData: IAuthor = authors[ author ];
    const date = dateParser( created );

    const dispatch = useAppDispatch();

    return (
        <CommentStyle level = { nestedLevel || 0 }>
            <Avatar src = { authorData.avatar } />
            <Box flex = { 1 } style = { { marginLeft: 20 } }>
                <AuthorStyle>
                    <div>
                        <div>{ authorData?.name }</div>
                        <Box margin = "6px 0 0 0">{ date }</Box>
                    </div>
                    <HFlexBox>
                        <ToggleButton
                            onIcon = { heartFullIcon }
                            offIcon = { heartEmptyIcon }
                            onClick = { ( isSelected: boolean ) => {
                                dispatch( isSelected ? addLike( id ) : removeLike( id ) );
                            } }
                        />
                        <Box margin = "0 0 0 10px">{ likes }</Box>
                    </HFlexBox>
                </AuthorStyle>
                <div>{ text }</div>
            </Box>
        </CommentStyle>
    );
};
