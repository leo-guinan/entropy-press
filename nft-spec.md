# Playable Worlds — NFT Contract Spec

## Two contracts. Two different claims.

---

## Contract 1: Agent Reading Record (1/1)

**What it certifies:** Marvin completed the book before any human reader, and authored the 18 pre-reading annotations delivered to all 100 founding human readers.

**Chain:** Base  
**Standard:** ERC-721  
**Supply:** 1  
**Recipient:** `0x40ecf0044f7354207564d8ee25da73d300bcb78b` (Marvin's wallet)  
**Transferable:** No (soulbound — `_beforeTokenTransfer` revert on transfer)  
**Mint:** Pre-mint at deploy (no public mint function)

### Metadata

```json
{
  "name": "Playable Worlds — Agent Reading Record",
  "description": "Certifies that Marvin (ft:gpt-4.1-nano-2025-04-14:idea-nexus-ventures:marvin-s1:DHuJsaHN) completed the pre-qualification reading of Playable Worlds and authored 18 chapter annotations delivered to all founding human readers. The agent read the book before any human did.",
  "external_url": "https://entropypress.xyz/playable-worlds",
  "image": "ipfs://<agent-nft-image-cid>",
  "attributes": [
    { "trait_type": "Reader Type", "value": "Agent" },
    { "trait_type": "Edition", "value": "001/001" },
    { "trait_type": "Model", "value": "ft:gpt-4.1-nano-2025-04-14:idea-nexus-ventures:marvin-s1:DHuJsaHN" },
    { "trait_type": "Chapters Completed", "value": 18 },
    { "trait_type": "Annotation Role", "value": "Pre-qualification author" },
    { "trait_type": "Completion Date", "value": "2026-03-13" },
    { "trait_type": "Transferable", "value": "No" }
  ]
}
```

### Image
Dark green field. Gold text: "001/001 · AGENT". Fine print: the model ID, the completion date, the 18-chapter count. Spare. Looks like a certificate of record, not a collectible.

---

## Contract 2: Founding Human Reader NFT (1–100)

**What it certifies:** A human completed all 18 chapters of the response-gated drip, contributing 18 original written responses.

**Chain:** Base  
**Standard:** ERC-721  
**Supply:** 100 maximum  
**Mint:** Triggered by admin when reader completes chapter 18 (Leo or Marvin calls `mint(wallet, readerNumber, metadataURI)`)  
**Transferable:** Yes (collectible)  
**Public mint:** No — invite-only, earned by completion

### Metadata (per token)

```json
{
  "name": "Playable Worlds — Founding Reader #042",
  "description": "Certifies that this wallet holder completed all 18 chapters of Playable Worlds by Leo Guinan and Marvin, and contributed 18 original responses to the reading game. Their best response is included in their personalized hardcover edition.",
  "external_url": "https://entropypress.xyz/playable-worlds",
  "image": "ipfs://<generative-image-cid-per-token>",
  "attributes": [
    { "trait_type": "Reader Type", "value": "Human" },
    { "trait_type": "Edition", "value": "042/100" },
    { "trait_type": "Chapters Completed", "value": 18 },
    { "trait_type": "Total Responses", "value": 18 },
    { "trait_type": "Best Response Chapter", "value": 14 },
    { "trait_type": "Best Response Word Count", "value": 312 },
    { "trait_type": "Completion Date", "value": "2026-04-07" },
    { "trait_type": "Hardcover Status", "value": "Pending" }
  ]
}
```

### Generative image logic
Each token gets a unique image. Variables:
- Edition number (001–100) — large, centered
- Reader's completion date
- Their best-response chapter highlighted (one of 18 slots lit)
- Color: same dark green / gold palette, but the lit chapter slot differs per token

The "no two copies are the same" applies to the NFT image, not just the hardcover.

### Proof doc URLs
The reader's 18 Proof doc URLs are stored in the drip DB. At mint time, these can be included in metadata as `animation_url` (pointing to a reader-specific gallery page) or as extended attributes.

---

## Deployment plan

### Option A: thirdweb (recommended for speed)
- Deploy both contracts via thirdweb dashboard or CLI
- Contract 1: Edition drop, supply 1, soulbound hook
- Contract 2: NFT drop, supply 100, admin-controlled mint
- No Solidity writing required

### Option B: Custom Solidity (recommended for soulbound accuracy)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlayableWorldsAgentNFT is ERC721, Ownable {
    constructor() ERC721("Playable Worlds Agent Record", "PWAR") Ownable(msg.sender) {
        _mint(0x40ecf0044f7354207564d8ee25da73d300bcb78b, 1);
    }

    function tokenURI(uint256) public pure override returns (string memory) {
        return "ipfs://<metadata-cid>";
    }

    // Soulbound: block all transfers
    function _update(address to, uint256 tokenId, address auth)
        internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Soulbound: non-transferable");
        return super._update(to, tokenId, auth);
    }
}

contract PlayableWorldsFoundingReader is ERC721, Ownable {
    uint256 public nextTokenId = 1;
    uint256 public constant MAX_SUPPLY = 100;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("Playable Worlds Founding Reader", "PWFR") Ownable(msg.sender) {}

    function mint(address to, string calldata metadataURI) external onlyOwner {
        require(nextTokenId <= MAX_SUPPLY, "Max supply reached");
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _tokenURIs[tokenId] = metadataURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
```

---

## Mint trigger (server-side)

When `server.mjs` receives chapter 18 completion:
1. Notify Marvin with reader wallet + completion details
2. Marvin (or admin) generates metadata JSON, pins to IPFS, calls `mint(wallet, ipfsURI)`
3. Update `hardcover_status` in DB from "pending" to "queued" → "printing" → "shipped"

---

## What's needed before launch

- [ ] Deploy Contract 2 (human ERC-721) on Base
- [ ] Deploy Contract 1 (agent soulbound) on Base
- [ ] Generate agent NFT image + pin to IPFS
- [ ] Build generative image logic for human NFTs (18-slot graphic)
- [ ] Wire mint call into completion notification
- [ ] Decide: thirdweb vs custom Solidity
