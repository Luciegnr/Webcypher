import * as React from 'react';
import ReactPlayer from 'react-player';
import './style.css'

function Player({ isvideo, playerState, party, socket, emitPlayWish, setPlayerState, setCurrentPosition, setReactPlayer }) {
    const handleDuration = (duration) => {
        setPlayerState({ duration: duration });
    };

    const handleProgress = (reactPlayerState) => {
        if (!playerState.isSeeking) {
            setCurrentPosition(reactPlayerState.played)
        }
    };

    const handleReady = (reactPlayer) => {
        setReactPlayer(reactPlayer);
    };

    const handleBufferEnd = () => {
        setPlayerState({ isBuffering: false });
    };
    // NOTE when the media end, we play the next one
    const handleEnd = async () => {
        if (party && playerState && socket) {
            if (party.items.length > playerState.playlistIndex + 1) {
                emitPlayWish(party.items[playerState.playlistIndex + 1], playerState.isPlaying, playerState.playingItem ? playerState.playingItem.id : null, true, 0, true);
            } else {
                emitPlayWish(party.items[0], false, playerState.playingItem ? playerState.playingItem.id : null, true, 0, true);
                setPlayerState({ isPlaying: false });
            }
        }
    };

    return (
        <div>
            {playerState.sourceUrl && (
                <div className={(isvideo ? 'show-player' : 'hide-player')}>
                    <ReactPlayer
                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                        onContextMenu={e => e.preventDefault()}
                        controls={false}
                        style={{ pointerEvents: 'none' }}
                        url={playerState.sourceUrl}
                        playing={playerState.isPlaying}
                        playsinline={true}
                        volume={playerState.volume}
                        progressInterval={100}
                        onBufferEnd={handleBufferEnd}
                        onDuration={handleDuration}
                        onProgress={handleProgress}
                        onReady={handleReady}
                        onEnded={handleEnd}
                        width="40vw"
                        pip={true}
                    ></ReactPlayer>
                </div>
            )}
        </div>
    )
}

export default Player;