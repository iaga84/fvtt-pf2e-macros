(async () => {

  const actor = game.user.character;
  const weaponName = "Large Greatsword";
  const conditionType = game.pf2e.ConditionManager.getCondition('Clumsy');
  const conditionName = conditionType.name;

  let chatMsg = '';

  if (actor !== undefined) {
    let weapon = actor.items.find(i => i.name === weaponName);
    let updates = [];

    if (weapon.data.data.equipped.value) {

      updates.push({
        "_id": weapon._id,
        "data.equipped.value": false
      });

      let conditionValue = (token.actor.data.items.find((x) => x.name === conditionType.name)) ? 0 : 1; // set the value of a valued condition here
      if (conditionValue) await game.pf2e.ConditionManager.addConditionToToken(conditionType, token);
      await game.pf2e.ConditionManager.updateConditionValue(token.actor.data.items.find((x) => x.name === conditionType.name)._id, token, 0);


      chatMsg = `${actor.name} ripone lo spadone`

    } else {

      updates.push({
        "_id": weapon._id,
        "data.equipped.value": true
      });

      let conditionValue = (token.actor.data.items.find((x) => x.name === conditionType.name)) ? 0 : 1; // set the value of a valued condition here
      if (conditionValue) await game.pf2e.ConditionManager.addConditionToToken(conditionType, token);
      await game.pf2e.ConditionManager.updateConditionValue(token.actor.data.items.find((x) => x.name === conditionType.name)._id, token, 1);

      chatMsg = `${actor.name} sfodera lo spadone! Aaarghhh!`

    }

    actor.updateEmbeddedEntity("OwnedItem", updates);

  } else {
    chatMsg = `${game.user.name} has no assigned character.`;
  }

  // write to chat
  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatMsg
  };

  await ChatMessage.create(chatData, {});
})();
