import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  setSocketData,
  setScrollIndex,
  resetSocketData,
} from "../redux/slice/link";
import { DeleteRounded } from "@mui/icons-material";

const genSpace = () => {
  let space = "";
  for (let i = 1; i <= 300; i++) {
    space += " ";
  }
  return space;
};

const genHashtag = (index) => {
  let hashtag = "";
  for (let i = 1; i <= index; i++) {
    hashtag += "##";
  }
  return hashtag;
};

function Log() {
  const ref = useRef(null);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { socketData, scrollIndex } = useSelector((state) => state.link);
  const { lastJsonMessage, readyState } = useWebSocket(
    `http://localhost:8000/ws/${user.name}/`
  );

  useEffect(() => {
    if (lastJsonMessage?.link) {
      dispatch(setSocketData(lastJsonMessage.link));
    }
    if (lastJsonMessage?.scroll) {
      dispatch(setScrollIndex(lastJsonMessage.scroll.index));
    }
    if (lastJsonMessage?.message) {
      dispatch(setSocketData(lastJsonMessage.message));
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (ref) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [socketData, ref]);
  return (
    <Box
      ref={ref}
      sx={{
        background: "#0A2647",
        height: "96%",
        borderRadius: 1,
        color: "#FFF",
        textAlign: "start",
        p: 1,
        overflow: "scroll",
      }}
    >
    
      {scrollIndex ? (
        <Typography>
          {`${scrollIndex * 2}/100 - [${genHashtag(scrollIndex)}] ${
            scrollIndex === 100 ? "Done" : ""
          }`}
        </Typography>
      ) : (
        ""
      )}

      {socketData.map((item) => (
        <Typography>{JSON.stringify(item)}</Typography>
      ))}
    </Box>
  );
}

export default Log;
