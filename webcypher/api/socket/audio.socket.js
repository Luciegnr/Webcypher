const path = require("path");
const fs = require("fs")
const CronJob = require('cron').CronJob;

function audio(io) {

    const persistentValues = fs.existsSync(path.resolve('data/persistence.json')) ? JSON.parse(fs.readFileSync(path.resolve('data/persistence.json'), 'utf-8')) : { currentPlayWishes: {}, lastPositions: {} };
    const currentPlayWishes = persistentValues.currentPlayWishes;
    const lastPositions = persistentValues.lastPositions;

    new CronJob('*/15 * * * *', () => { fs.writeFileSync(path.resolve('data/persistence.json'), JSON.stringify({ currentPlayWishes, lastPositions })); }, null, false).start();

    io.on('connection', (socket) => {
        let socketUserId = "";
        const joinParty = async (data) => {
            socketUserId = data.userId;
            const members = await io.in(data.partyId).allSockets();

            if (!members.has(socketUserId)) {
                socket.join(data.partyId);
                socket.emit('serverTimeOffset', Date.now() - data.timestamp);
                if (currentPlayWishes[data.partyId]) {
                    socket.emit('playOrder', currentPlayWishes[data.partyId]);
                }
                return Promise.resolve();
            } else {
                return Promise.reject(
                    new Error('User already joined the party')
                );
            }
        };

        socket.on('joinParty', async (data) => {
            await joinParty(data);
        });

        socket.on('leaveParty', (data) => {
            socket.leave(data.partyId);
        });

        socket.on('playWish', (playWish) => {
            const playWishWithNormalizedTimestamp = {
                ...playWish,
                timestamp:
                    playWish.timestamp + (Date.now() - playWish.timestamp)
            };

            if (playWish.lastPosition && playWish.lastPosition.position > 0) {
                if (!lastPositions[playWish.partyId]) {
                    lastPositions[playWish.partyId] = {};
                }
                lastPositions[playWish.partyId][playWish.lastPosition.itemId] = playWish.lastPosition.position;
            }

            if (playWishWithNormalizedTimestamp.requestLastPosition && lastPositions[playWish.partyId] && lastPositions[playWish.partyId][playWishWithNormalizedTimestamp.mediaItemId]) {
                playWishWithNormalizedTimestamp.lastPosition = {
                    itemId: playWishWithNormalizedTimestamp.mediaItemId,
                    position: lastPositions[playWishWithNormalizedTimestamp.partyId][playWishWithNormalizedTimestamp.mediaItemId]
                };
            } else {
                if (playWishWithNormalizedTimestamp.lastPosition) {
                    delete playWishWithNormalizedTimestamp.lastPosition;
                }
            }

            currentPlayWishes[playWish.partyId] = playWishWithNormalizedTimestamp;
            io.to(playWish.partyId).emit('playOrder', playWishWithNormalizedTimestamp);
        });

        socket.on('partyUpdate', (partyUpdateData) => {
            io.emit('partyUpdate', partyUpdateData);
        });


        socket.on('mediaItemUpdate', (room) => {
            io.to(room.room._id).emit('mediaItemUpdate', room.room);
        });

        socket.on('disconnect', () => {
            console.log(
                'info',
                `Web Sockets: User disconnected: ${socketUserId}`
            );
        });

        socket.on('remove-room', (room) => {
            console.log('info', `Web Sockets: Room removed: ${room._id}`);
            io.to(room._id).emit('remove-room');
        });
    });
}
module.exports = audio
