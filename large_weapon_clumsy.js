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
      actor.setRollOption('all', 'oversized', false);

      let conditionValue = (token.actor.data.items.find((x) => x.name === conditionType.name)) ? 0 : 1; // set the value of a valued condition here
      if (conditionValue) await game.pf2e.ConditionManager.addConditionToToken(conditionType, token);
      await game.pf2e.ConditionManager.updateConditionValue(token.actor.data.items.find((x) => x.name === conditionType.name)._id, token, 0);


      chatMsg = `${actor.name} ripone lo spadone`

    } else {

      updates.push({
        "_id": weapon._id,
        "data.equipped.value": true
      });
      actor.setRollOption('all', 'oversized', true);

      let conditionValue = (token.actor.data.items.find((x) => x.name === conditionType.name)) ? 0 : 1; // set the value of a valued condition here
      if (conditionValue) await game.pf2e.ConditionManager.addConditionToToken(conditionType, token);
      await game.pf2e.ConditionManager.updateConditionValue(token.actor.data.items.find((x) => x.name === conditionType.name)._id, token, 1);

      chatMsg = `${actor.name} sfodera lo spadone!`
AudioHelper.play({src: "sounds/effects/spada_estrazione.mp3", volume: 0.8, autoplay: true, loop: false}, true);


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
