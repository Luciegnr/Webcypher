import * as React from 'react';
import { FastRewindIcon, FastForwardIcon, PlayArrowIcon, PauseIcon, VolumeUpIcon } from '@config/icons';

function Player({ socket, playerState, currentPosition, setPlayerState, setCurrentPosition, reactPlayer, emitPlayWish, party }) {

    const handleSeekMouseDown = () => {
        setPlayerState({ isSeeking: true });
    };
    const handleSeekChange = (event) => {
        if (reactPlayer) {
            setCurrentPosition(parseFloat(event.target.value))
        }
    };

    const handleVolumeChange = (volume) => {
        setPlayerState({ volume: parseFloat(volume.target.value) });
    };

    const handleSeekMouseUp = (event) => {
        if (playerState.playingItem) {
            emitPlayWish(
                playerState.playingItem,
                playerState.isPlaying,
                null,
                false,
                parseFloat((event.target).value)
            );
        }
    };
    function format(seconds) {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes().toString();
        const ss = pad(date.getUTCSeconds().toString());
        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`;
        }
        return `${mm}:${ss}`;
    }
    function pad(string) {
        return ('0' + string).slice(-2);
    }

    function nextMediaItem() {
        if (party && party.items.length) {
            const nextIndex = playerState.playlistIndex + 1;
            if (nextIndex < party.items.length) {
                const nextItem = party.items[nextIndex];
                setPlayerState({ playingItem: nextItem });
                emitPlayWish(nextItem, true, playerState.playingItem ? playerState.playingItem._id : null, false, 0);
            }
        }
    };

    function previousMediaItem() {
        if (party && party.items.length) {
            const nextIndex = playerState.playlistIndex - 1;
            if (nextIndex >= 0) {
                const nextItem = party.items[nextIndex];
                setPlayerState({ playingItem: nextItem });
                emitPlayWish(nextItem, true, playerState.playingItem ? playerState.playingItem._id : null, false, 0);
            }
        }
    };
    const getCurrentPosition = () => {
        if (reactPlayer) {
            return reactPlayer.getCurrentTime() / reactPlayer.getDuration();
        } else {
            return undefined;
        }
    };
    const handlePlayPause = () => {
        if (playerState.playingItem) {
            if (playerState.isPlaying) {
                emitPlayWish(playerState.playingItem, false, playerState.playingItem.id, false, getCurrentPosition());
            } else {
                emitPlayWish(playerState.playingItem, true, null, false, getCurrentPosition());
            }
        }
    };
    return (
        <div className="flex w-full h-full pointer-events-none" style={{ display: "flex", padding: 0 }}>
            {socket ?
                <div style={{ flex: 1 }}>
                    <FastRewindIcon fontSize="large" onClick={previousMediaItem} />
                    {playerState.isPlaying ? (
                        <PauseIcon className="pointer-events-auto" onClick={handlePlayPause} fontSize="large" />
                    ) : (
                        <PlayArrowIcon className="pointer-events-auto" onClick={handlePlayPause} fontSize="large" />
                    )}
                    <FastForwardIcon fontSize="large" onClick={nextMediaItem} />
                </div>
                :
                ""
            }

            <div style={{ flex: 5, display: "flex" }}>
                {socket ?
                    <input
                        style={{ width: "-webkit-fill-available", }}
                        min={0}
                        max={1}
                        step="any"
                        type="range"
                        value={currentPosition || 0}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                        className={'slider' + (playerState.duration !== Infinity ? '' : ' invisible')}
                        aria-label="Seek bar"
                    /> :
                    <input
                        style={{ width: "-webkit-fill-available", }}
                        min={0}
                        max={1}
                        step="any"
                        readOnly
                        type="range"
                        value={currentPosition || 0}
                        className={'slider' + (playerState.duration !== Infinity ? '' : ' invisible')}
                        aria-label="Seek bar"
                    />}
                <time style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} dateTime={`P${Math.round(playerState.duration * currentPosition)}S`} > {format(playerState.duration * currentPosition)} </time>

                {/* NOTE volume slider */}
                {socket ?
                    <div>
                        <VolumeUpIcon fontSize="large" />
                        <input type="range" min={0} max={1} step={0.05} aria-label="Volume Slider" className={'slider slider-alt slider-small ml-12'} onChange={handleVolumeChange} value={playerState.volume} style={{ width: "4vw", }} />
                    </div> :
                    ""
                }
                </div>
        </div>
    )
}

export default Player;