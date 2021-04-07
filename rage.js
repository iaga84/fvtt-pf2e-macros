const ITEM_UUID = 'Compendium.pf2e.feature-effects.z3uyCMBddrPK5umr'; // const ITEM_UUID = 'Compendium.pf2e.feature-effects.z3uyCMBddrPK5umr'; // Effect: Rage
let chatMsg = '';

(async () => {


  // make the effect follow the condition
  let item = await fromUuid(ITEM_UUID);
  for (const token of canvas.tokens.controlled) {
    let existing = token.actor.items.filter(i => i.type === item.type).find(e => e.name === item.name);

    if (!existing) {
      item = duplicate(item);
      await token.actor.createOwnedItem(item);
      chatMsg = `Aaarrgggghhhh!!! ${actor.name} e' in preda alla furia!!!`

    }

    if (existing) {
      await token.actor.deleteOwnedItem(existing._id);
      chatMsg = `${actor.name} si sta calmando.`

    }

  }

  // write to chat
  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatMsg
  };

  await ChatMessage.create(chatData, {});

})();
