oS.Init(
  {
    PName: [
      // oPeashooter,  // 豌豆射手
      // oSunFlower,  // 向日葵
      oCherryBomb,  // 樱桃炸弹
      oWallNut,  // 坚果墙
      // oPotatoMine,  // 土豆雷
      oSnowPea,  // 寒冰射手
      oChomper,  // 大嘴花
      // oSplitPea,  // 分裂射手
      oJalapeno,  // 火爆辣椒
      // oSpikeweed,  // 地刺
      // oRepeater,  // 双发射手
      // oTallNut,  // 高坚果
      oPumpkinHead,  // 南瓜头
      // oSquash,  // 窝瓜
      oFlowerPot,  // 花盆
      // oTorchwood,  // 火炬树桩
      oThreepeater,  // 三线射手
      oGatlingPea,  // 加特林
      // oTwinSunflower,  // 双子向日葵
      oSpikerock,  // 地刺王
      // oFumeShroom,  // 大喷菇
      // oCoffeeBean,  // 咖啡豆
      // oGloomShroom,  // 曾哥
      // oSunShroom,  // 阳光菇
      // oPuffShroom,  // 小喷菇
      // oScaredyShroom,  // 胆小菇
      oGarlic,  // 大蒜
    ],
    interval:null, //定时器
    plantCard:[],  // 植物DID列表数据
    ChosePlantCard:0,
    ZName: [oZombie,oFlagZombie,oBucketheadZombie,oPoleVaultingZombie, oConeheadZombie],
    PicArr: (function () {
        var a = oRepeater.prototype,
          b = a.PicArr;
        return ["images/interface/background1.jpg", b[a.CardGif], b[a.NormalGif]];
      })(),
    backgroundImage: "images/interface/background1.jpg",
    CanSelectCard: 0,
    StaticCard: 0,
    LevelName: "特别关：随机植物！！",
    LargeWaveFlag: { 10: $("imgFlag1") },
    LoadMusic: function () {
      NewEle("oEmbed", "embed", "width:0;height:0", { src: "music/Look up at the.swf" }, EDAll);
    },
    StartGame: function () {
      ClearChild($("oEmbed"));
      NewEle("oEmbed", "embed", "width:0;height:0", { src: "music/UraniwaNi.swf" }, EDAll);
      SetVisible($("tdShovel"), $("dFlagMeter"));
      SetNone($("dSunNum"));
      SetBlock($("dTop"));
      oS.InitLawnMower();
      oS.PName.forEach(element => {
        var f = "dCard" + Math.random();
        oS.plantCard.push({ DID: f, PName: element, PixelTop: 600 })
      });
      PrepareGrowPlants(function () {
        oP.Monitor({
          f: function () {
            (function () {
              var a = ArCard.length;
              if (a < 10) {
                var c = oS.PName,
                  b = Math.floor(Math.random() * c.length),
                  e = c[b],
                  d = e.prototype,
                  f = "dCard" + Math.random();
                ArCard[a] = { DID: f, PName: e, PixelTop: 600 };
                NewImg(f, d.PicArr[d.CardGif], "top:600px;cursor:pointer", $("dCardList"), {
                  onmouseover: function (g) {
                    ViewPlantTitle(GetChoseCard(f), g);
                  },
                  onmouseout: function () {
                    SetNone($("dTitle"));
                  },
                  onclick: function (g) {
                    // ChosePlant(g, oS.ChoseCard, f);
                    // 定时器作为刷新
                    // setInterval(ChosePlant,100,g, oS.ChoseCard, f);
                    ChosePlant(g, oS.ChoseCard, f);
                    oS.interval = setInterval(function() {
                      ChosePlant(g, oS.ChoseCard, f);
                  }, 80); 
                  },
                });
              }
              oSym.addTask(400, arguments.callee, []);
            })();
            (function () {
              var b = ArCard.length,
                a,
                c;
              while (b--) {
                (c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px");
              }
              oSym.addTask(5, arguments.callee, []);
            })();
          },
          ar: [],
        });
        oP.AddZombiesFlag();
        SetVisible($("dFlagMeterContent"));
      });
    },
  },
  {
    ArZ: [
      oZombie,
      oZombie,oFlagZombie,
      oZombie,oFlagZombie,oBucketheadZombie,oPoleVaultingZombie, oConeheadZombie,
      oConeheadZombie,
    ],
    FlagNum: 20,
    SumToZombie: { 1: 2, 2: 11, 3: 15, default: 15 },
    FlagToSumNum: {
      a1: [3, 5, 9, 10, 13, 15, 19],
      a2: [1, 3, 5, 20, 10, 15, 20],
    }, //a2:僵尸总数
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
  },
  {
    GetChoseCard: function (b) {
      var a = ArCard.length;
      while (a--) {
        ArCard[a].DID == b && ((oS.ChoseCard = a), (a = 0));
      }
      return oS.ChoseCard;
    },
    ChosePlant: function (a, b) {
      // var f = ArCard[oS.ChoseCard],
      oS.ChosePlantCard = Math.floor(Math.random()*oS.PName.length);
      var f = oS.plantCard[oS.ChosePlantCard],
        e = (a = a || event).clientX,
        d = a.clientY + document.body.scrollTop,
        c = f.PName.prototype;
        // c = f.prototype;
      oS.Chose = 1;
      var plantImg = $Pn[c.EName].childNodes[1].cloneNode(false);
      $('MovePlant')?ReplacePlant(plantImg):
      EditImg(
        EditImg(
          // $Pn[c.EName].childNodes[1].cloneNode(false),
          plantImg,  // 植物图片
          "MovePlant",
          "",
          { left: e - c.width * 0.5 + "px", top: d + 20 - c.height + "px", zIndex: 254 },
          EDAll
        ).cloneNode(false),
        "MovePlantAlpha",
        "",
        { display: "none", filter: "alpha(opacity=40)", opacity: 0.4, zIndex: 30 },
        EDAll
      );
      // SetAlpha($(f.DID), 50, 0.5);
      SetAlpha($(ArCard[oS.ChoseCard].DID), 50, 0.5);
      SetNone($("dTitle"));
    },
    ReplacePlant:function(img){
      $('MovePlant').setAttribute('src',img.getAttribute('src'));
      $('MovePlantAlpha').setAttribute('src',img.getAttribute('src'));
    },
    CancelPlant: function () {
      ClearChild($("MovePlant"), $("MovePlantAlpha"));
      oS.Chose = 0;
      SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
      oS.ChoseCard = "";
    },
    GrowPlant: function (k, c, b, f, a) {
      clearInterval(oS.interval);
      var i = oS.ChosePlantCard,
        g = oS.plantCard[i],
        h = g.PName,
        j = h.prototype,
        d = ArCard[oS.ChoseCard].DID,
        e;
        (function () {
                new h().Birth(c, b, f, a, k);
                SetStyle($("imgGrowSoil"), { left: c - 30 + "px", top: b - 40 + "px", zIndex: 3 * f, display: "block" });
                oSym.addTask(20, SetNone, [$("imgGrowSoil")]);
                ClearChild($("MovePlant"), $("MovePlantAlpha"));
                $("dCardList").removeChild((e = $(d)));
                e = null;
                ArCard.splice(oS.ChoseCard, 1);
                oS.ChoseCard = "";
                oS.Chose = 0;
              })()
      // j.CanGrow(k, f, a)
      //   ? (function () {
      //       new h().Birth(c, b, f, a, k);
      //       SetStyle($("imgGrowSoil"), { left: c - 30 + "px", top: b - 40 + "px", zIndex: 3 * f, display: "block" });
      //       oSym.addTask(20, SetNone, [$("imgGrowSoil")]);
      //       ClearChild($("MovePlant"), $("MovePlantAlpha"));
      //       $("dCardList").removeChild((e = $(d)));
      //       e = null;
      //       ArCard.splice(i, 1);
      //       oS.ChoseCard = "";
      //       oS.Chose = 0;
      //     })()
      //   : CancelPlant();
    },
    ViewPlantTitle: function (a) {
      var c = $("dTitle"),
        b = ArCard[a].PName.prototype;
      c.innerHTML = b.CName + "<br>" + b.Tooltip;
      SetStyle(c, { top: 60 * a + "px", left: "100px" });
    },
  }
);
