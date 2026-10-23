"""Offline demonstration; no external services or credentials required."""
import argparse, json
from collections import defaultdict

def rank(trades):
    volumes = defaultdict(int)
    for trader, volume in trades: volumes[trader] += volume
    return [{"rank": i + 1, "trader": trader, "volume": volume}
            for i, (trader, volume) in enumerate(sorted(volumes.items(), key=lambda x: (-x[1], x[0])))]

if __name__ == "__main__":
    p = argparse.ArgumentParser(description="Deterministic offline trade-volume ranking; not the WebSocket API.")
    p.add_argument("--trade", action="append", metavar="NAME:VOLUME", help="repeat to supply trades")
    a = p.parse_args()
    trades = []
    for item in a.trade or ["demo-alice:100", "demo-bob:200", "demo-alice:150"]:
        try:
            name, value = item.rsplit(":", 1)
            volume = int(value)
            if not name.strip() or volume <= 0: raise ValueError()
        except ValueError: p.error("each trade must be NAME:positive-integer")
        trades.append((name, volume))
    print(json.dumps({"mode": "mock; no live market feed", "leaderboard": rank(trades)}, indent=2))
