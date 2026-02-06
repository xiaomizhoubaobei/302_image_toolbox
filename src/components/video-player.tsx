/**
 * @fileoverview 视频播放器组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了视频播放器组件，用于播放视频。
 *          该组件提供以下功能：
 *          - 显示视频播放器
 *          - 支持视频控制
 *
 *          依赖关系：
 *          - 依赖 react-player 模块进行视频播放
 */
import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  width?: string;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  width = "100%",
  height = "100%",
}) => {
  return (
    <ReactPlayer
      url={url}
      width={width}
      height={height}
      controls={true}
      config={{
        youtube: {
          playerVars: { showinfo: 1 },
        },
      }}
    />
  );
};

export default VideoPlayer;