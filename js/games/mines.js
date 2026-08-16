/* ============================================================
         4. MINES GAME LOGIC
      ============================================================ */
      const mState = { bet: 50, mines: 3, grid: [], revealed: [], active: false, gemsFound: 0 };

      /* Restaura el aspecto neutro de las 25 fichas físicas de la mesa 3D */
      function resetMinesTiles3D() {
        minesTileMeshes.forEach(t => {
          t.material.color.set(0x241a3d);
          t.material.emissive.set(0x8B5CF6);
          t.material.emissiveIntensity = 0.25;
          t.position.y = t.userData.baseY;
          if (t.userData.icon) {
            t.remove(t.userData.icon);
            t.userData.icon.material.map.dispose();
            t.userData.icon.material.dispose();
            t.userData.icon = null;
          }
          t.userData.revealed = false;
        });
      }

      /* Revela físicamente una ficha en la mesa 3D (gema o mina) */
      function reveal3DMinesTile(idx, type) {
        const t = minesTileMeshes[idx];
        if (!t || t.userData.revealed) return;
        t.userData.revealed = true;
        t.position.y = t.userData.baseY - 0.045; // se hunde ligeramente al ser pulsada
        if (type === 'bomb') {
          t.material.color.set(0x450a0a);
          t.material.emissive.set(0xef4444);
          t.material.emissiveIntensity = 1.5;
        } else {
          t.material.color.set(0x052e16);
          t.material.emissive.set(0x22c55e);
          t.material.emissiveIntensity = 1.3;
        }
        const spr = makeEmojiSprite(type === 'bomb' ? '💣' : '💎', 0.28);
        spr.position.set(0, 0.24, 0);
        t.add(spr);
        t.userData.icon = spr;
      }

      document.getElementById('minesStartBtn').addEventListener('click', () => {
        mState.bet = roundMoney(document.getElementById('minesBetInput').value);
        mState.mines = parseInt(document.getElementById('minesCountSelect').value, 10);
        if (state.balance < mState.bet) { showToast('Saldo insuficiente'); return; }

        state.balance = roundMoney(state.balance - mState.bet); updateBalanceUI();
        mState.active = true; mState.gemsFound = 0;
        mState.grid = Array(25).fill('gem');
        mState.revealed = Array(25).fill(false);

        let placed = 0;
        while (placed < mState.mines) {
          const r = Math.floor(Math.random() * 25);
          if (mState.grid[r] !== 'bomb') { mState.grid[r] = 'bomb'; placed++; }
        }

        resetMinesTiles3D();
        document.getElementById('minesStartBtn').style.display = 'none';
        document.getElementById('minesCashoutBtn').style.display = 'inline-block';
        document.getElementById('minesMultDisplay').textContent = '1.00x';
        document.getElementById('minesCashoutBtn').textContent = 'COBRAR (' + formatMoney(mState.bet) + ')';
      });

      function clickMineTile(idx) {
        if (!mState.active) return;
        if (mState.revealed[idx]) return;
        mState.revealed[idx] = true;

        if (mState.grid[idx] === 'bomb') {
          playSound('explosion');
          reveal3DMinesTile(idx, 'bomb');
          mState.active = false;
          showToast('¡BOMBA! Perdiste ' + formatMoney(mState.bet));
          document.getElementById('minesStartBtn').style.display = 'inline-block';
          document.getElementById('minesCashoutBtn').style.display = 'none';
        } else {
          playSound('chip');
          reveal3DMinesTile(idx, 'gem');
          mState.gemsFound++;
          const mult = (1 + (mState.gemsFound * 0.25 * mState.mines)).toFixed(2);
          const winVal = roundMoney(mState.bet * mult);
          document.getElementById('minesMultDisplay').textContent = mult + 'x';
          document.getElementById('minesCashoutBtn').textContent = 'COBRAR (' + formatMoney(winVal) + ')';
        }
      }

      document.getElementById('minesCashoutBtn').addEventListener('click', () => {
        if (!mState.active) return;
        const mult = parseFloat(document.getElementById('minesMultDisplay').textContent);
        const prize = roundMoney(mState.bet * mult);
        state.balance = roundMoney(state.balance + prize); updateBalanceUI();
        triggerConfetti(); addXP(150);
        showToast('¡COBRASTE ' + formatMoney(prize) + '! 🎉');
        mState.active = false;
        document.getElementById('minesStartBtn').style.display = 'inline-block';
        document.getElementById('minesCashoutBtn').style.display = 'none';
      });

// --- Explicit Global Window Bindings ---
if (typeof minesState !== 'undefined') window.minesState = minesState;
