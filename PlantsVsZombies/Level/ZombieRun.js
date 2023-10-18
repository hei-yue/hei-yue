oS.Init(
  {
    PName: [
      oPeashooter,  // 豌豆射手
      oSunFlower,  // 向日葵
      oCherryBomb,  // 樱桃炸弹
      oWallNut,  // 坚果墙
      oPotatoMine,  // 土豆雷
      oSnowPea,  // 寒冰射手
      oChomper,  // 大嘴花
      oSplitPea,  // 分裂射手
      oJalapeno,  // 火爆辣椒
      oSpikeweed,  // 地刺
      oRepeater,  // 双发射手
      oTallNut,  // 高坚果
      oPumpkinHead,  // 南瓜头
      oSquash,  // 窝瓜
      oFlowerPot,  // 花盆
      oTorchwood,  // 火炬树桩
      oThreepeater,  // 三线射手
      oGatlingPea,  // 加特林
      oTwinSunflower,  // 双子向日葵
      oSpikerock,  // 地刺王
      oFumeShroom,  // 大喷菇
      oCoffeeBean,  // 咖啡豆
      oGloomShroom,  // 曾哥
      oSunShroom,  // 阳光菇
      oPuffShroom,  // 小喷菇
      oScaredyShroom,  // 胆小菇
      oGarlic,  // 大蒜
    ],
    ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
    PicArr: ["images/interface/background1.jpg", "images/interface/trophy.png"],
    backgroundImage: "images/interface/background1.jpg",
    CanSelectCard: 1,
    LevelName: "小游戏：僵尸快跑!",
    LvlClearFunc: function () {
      oSym.TimeStep = 10;
    },
    LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
    LoadMusic: function () {
      NewEle(
        "oEmbed",
        "embed",
        "width:0;height:0",
        { src: "music/Look up at the.swf" },
        EDAll
      );
    },
    StartGame: function () {
      ClearChild($("oEmbed"));
      NewEle(
        "oEmbed",
        "embed",
        "width:0;height:0",
        { src: "music/Watery Graves.swf" },
        EDAll
      );
      SetVisible($("tdShovel"), $("dFlagMeter"));
      SetBlock($("dTop"));
      oS.InitLawnMower();
      PrepareGrowPlants(function () {
        oP.Monitor({
          ar: [],
          f: function () {
            oSym.TimeStep = 2;
          },
        });
        BeginCool();
        AutoProduceSun(25);
        oSym.addTask(
          1500,
          function () {
            oP.AddZombiesFlag();
            SetVisible($("dFlagMeterContent"));
          },
          []
        );
      });
    },
  },
  {
    ArZ: [
      oZombie,
      oZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
      oConeheadZombie,
      oPoleVaultingZombie,
      oPoleVaultingZombie,
      oPoleVaultingZombie,
      oPoleVaultingZombie,
      oBucketheadZombie,
      oBucketheadZombie,
      oBucketheadZombie,
      oBucketheadZombie,
    ],
    FlagNum: 20,
    SumToZombie: { 1: 2, 2: 11, 3: 15, default: 15 },
    FlagToSumNum: {
      a1: [3, 5, 9, 10, 13, 15, 19],
      a2: [1, 3, 5, 20, 10, 15, 20, 30],
    },
    FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
    FlagToEnd: function () {
      NewImg(
        "imgSF",
        "images/interface/trophy.png",
        "left:367px;top:233px",
        EDAll,
        {
          onclick: function () {
            SelectModal(0);
          },
        }
      );
    },
  }
);
