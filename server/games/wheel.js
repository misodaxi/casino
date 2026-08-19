// ============================================================
// MIDNIGHT CASINO - FORTUNE WHEEL MULTIPLAYER SERVER HANDLER
// ============================================================

function setupWheelSocketEvents(io, socket, players) {
  socket.on('fortuneWheelSpin', (data) => {
    const p = players[socket.id];
    const playerName = (p && p.name) ? p.name : (data && data.playerName ? data.playerName : 'Jugador');
    const zone = socket.currentZone || 'wheel';

    socket.to('zone:' + zone).emit('fortuneWheelPlayerSpin', {
      playerId: socket.id,
      playerName: playerName,
      bet: (data && typeof data.bet === 'number') ? data.bet : 50,
      seatIndex: data ? data.seatIndex : null,
      timestamp: Date.now()
    });
  });

  socket.on('fortuneWheelResult', (data) => {
    const p = players[socket.id];
    const playerName = (p && p.name) ? p.name : (data && data.playerName ? data.playerName : 'Jugador');
    const zone = socket.currentZone || 'wheel';

    socket.to('zone:' + zone).emit('fortuneWheelPlayerResult', {
      playerId: socket.id,
      playerName: playerName,
      bet: (data && typeof data.bet === 'number') ? data.bet : 50,
      win: (data && typeof data.win === 'number') ? data.win : 0,
      mult: (data && data.mult) ? data.mult : '0X',
      timestamp: Date.now()
    });
  });
}

module.exports = {
  setupWheelSocketEvents
};
