BEGIN_FUNCTION_MAP
    .Feed, (KVH2)KVX 호가잔량, KVH2, key=15, keycnt=1000, bufcnt=1, group=1;
    BEGIN_DATA_MAP
    InBlock,입력,input;
    begin
    종목코드               , symbol               , symbol               , char   ,   15;
    end
    OutBlock,출력,output;
    begin
    종목코드               , symbol               , symbol               , char   ,   15;
    호가시간               , hotime               , hotime               , char   ,   10;
    매도호가1              , ask1                 , ask1                 , char ,   20;
    매수호가1              , bid1                 , bid1                 , char ,   20;
    매도호가 잔량1         , askrest1             , askrest1             , char ,   20;
    매수호가 잔량1         , bidrest1             , bidrest1             , char ,   20;
    매도호가 건수1         , askcnt1              , askcnt1              , long   ,   15;
    매수호가 건수1         , bidcnt1              , bidcnt1              , long   ,   15;
    직전매도대비수량1      , bfrsellcompqty1      , bfrsellcompqty1      , double ,   20;
    직전매수대비수량1      , bfrbuycompqty1       , bfrbuycompqty1       , double ,   20;
    매도호가2              , ask2                 , ask2                 , char ,   20;
    매수호가2              , bid2                 , bid2                 , char ,   20;
    매도호가 잔량2         , askrest2             , askrest2             , char ,   20;
    매수호가 잔량2         , bidrest2             , bidrest2             , char ,   20;
    매도호가 건수2         , askcnt2              , askcnt2              , long   ,   15;
    매수호가 건수2         , bidcnt2              , bidcnt2              , long   ,   15;
    직전매도대비수량2      , bfrsellcompqty2      , bfrsellcompqty2      , double ,   20;
    직전매수대비수량2      , bfrbuycompqty2       , bfrbuycompqty2       , double ,   20;
    매도호가3              , ask3                 , ask3                 , char ,   20;
    매수호가3              , bid3                 , bid3                 , char ,   20;
    매도호가 잔량3         , askrest3             , askrest3             , char ,   20;
    매수호가 잔량3         , bidrest3             , bidrest3             , char ,   20;
    매도호가 건수3         , askcnt3              , askcnt3              , long   ,   15;
    매수호가 건수3         , bidcnt3              , bidcnt3              , long   ,   15;
    직전매도대비수량3      , bfrsellcompqty3      , bfrsellcompqty3      , double ,   20;
    직전매수대비수량3      , bfrbuycompqty3       , bfrbuycompqty3       , double ,   20;
    매도호가4              , ask4                 , ask4                 , char ,   20;
    매수호가4              , bid4                 , bid4                 , char ,   20;
    매도호가 잔량4         , askrest4             , askrest4             , char ,   20;
    매수호가 잔량4         , bidrest4             , bidrest4             , char ,   20;
    매도호가 건수4         , askcnt4              , askcnt4              , long   ,   15;
    매수호가 건수4         , bidcnt4              , bidcnt4              , long   ,   15;
    직전매도대비수량4      , bfrsellcompqty4      , bfrsellcompqty4      , double ,   20;
    직전매수대비수량4      , bfrbuycompqty4       , bfrbuycompqty4       , double ,   20;
    매도호가5              , ask5                 , ask5                 , char ,   20;
    매수호가5              , bid5                 , bid5                 , char ,   20;
    매도호가 잔량5         , askrest5             , askrest5             , char ,   20;
    매수호가 잔량5         , bidrest5             , bidrest5             , char ,   20;
    매도호가 건수5         , askcnt5              , askcnt5              , long   ,   15;
    매수호가 건수5         , bidcnt5              , bidcnt5              , long   ,   15;
    직전매도대비수량5      , bfrsellcompqty5      , bfrsellcompqty5      , double ,   20;
    직전매수대비수량5      , bfrbuycompqty5       , bfrbuycompqty5       , double ,   20;
    매도호가6              , ask6                 , ask6                 , char ,   20;
    매수호가6              , bid6                 , bid6                 , char ,   20;
    매도호가 잔량6         , askrest6             , askrest6             , char ,   20;
    매수호가 잔량6         , bidrest6             , bidrest6             , char ,   20;
    매도호가 건수6         , askcnt6              , askcnt6              , long   ,   15;
    매수호가 건수6         , bidcnt6              , bidcnt6              , long   ,   15;
    직전매도대비수량6      , bfrsellcompqty6      , bfrsellcompqty6      , double ,   20;
    직전매수대비수량6      , bfrbuycompqty6       , bfrbuycompqty6       , double ,   20;
    매도호가7              , ask7                 , ask7                 , char ,   20;
    매수호가7              , bid7                 , bid7                 , char ,   20;
    매도호가 잔량7         , askrest7             , askrest7             , char ,   20;
    매수호가 잔량7         , bidrest7             , bidrest7             , char ,   20;
    매도호가 건수7         , askcnt7              , askcnt7              , long   ,   15;
    매수호가 건수7         , bidcnt7              , bidcnt7              , long   ,   15;
    직전매도대비수량7      , bfrsellcompqty7      , bfrsellcompqty7      , double ,   20;
    직전매수대비수량7      , bfrbuycompqty7       , bfrbuycompqty7       , double ,   20;
    매도호가8              , ask8                 , ask8                 , char ,   20;
    매수호가8              , bid8                 , bid8                 , char ,   20;
    매도호가 잔량8         , askrest8             , askrest8             , char ,   20;
    매수호가 잔량8         , bidrest8             , bidrest8             , char ,   20;
    매도호가 건수8         , askcnt8              , askcnt8              , long   ,   15;
    매수호가 건수8         , bidcnt8              , bidcnt8              , long   ,   15;
    직전매도대비수량8      , bfrsellcompqty8      , bfrsellcompqty8      , double ,   20;
    직전매수대비수량8      , bfrbuycompqty8       , bfrbuycompqty8       , double ,   20;
    매도호가9              , ask9                 , ask9                 , char ,   20;
    매수호가9              , bid9                 , bid9                 , char ,   20;
    매도호가 잔량9         , askrest9             , askrest9             , char ,   20;
    매수호가 잔량9         , bidrest9             , bidrest9             , char ,   20;
    매도호가 건수9         , askcnt9              , askcnt9              , long   ,   15;
    매수호가 건수9         , bidcnt9              , bidcnt9              , long   ,   15;
    직전매도대비수량9      , bfrsellcompqty9      , bfrsellcompqty9      , double ,   20;
    직전매수대비수량9      , bfrbuycompqty9       , bfrbuycompqty9       , double ,   20;
    매도호가10             , ask10                , ask10                , char ,   20;
    매수호가10             , bid10                , bid10                , char ,   20;
    매도호가 잔량10        , askrest10            , askrest10            , char ,   20;
    매수호가 잔량10        , bidrest10            , bidrest10            , char ,   20;
    매도호가 건수10        , askcnt10             , askcnt10             , long   ,   15;
    매수호가 건수10        , bidcnt10             , bidcnt10             , long   ,   15;
    직전매도대비수량10     , bfrsellcompqty10     , bfrsellcompqty10     , double ,   20;
    직전매수대비수량10     , bfrbuycompqty10      , bfrbuycompqty10      , double ,   20;
	매도호가11              , ask11                 , ask11                , char ,   20;
    매수호가11              , bid11                 , bid11                , char ,   20;
    매도호가 잔량11         , askrest11             , askrest11            , char ,   20;
    매수호가 잔량11         , bidrest11             , bidrest11            , char ,   20;
    매도호가 건수11         , askcnt11              , askcnt11             , long   ,   15;
    매수호가 건수11         , bidcnt11              , bidcnt11             , long   ,   15;
    직전매도대비수량11      , bfrsellcompqty11      , bfrsellcompqty11     , double ,   20;
    직전매수대비수량11      , bfrbuycompqty11       , bfrbuycompqty11      , double ,   20;
    매도호가12              , ask12                 , ask12                , char ,   20;
    매수호가12              , bid12                 , bid12                , char ,   20;
    매도호가 잔량12         , askrest12             , askrest12            , char ,   20;
    매수호가 잔량12         , bidrest12             , bidrest12            , char ,   20;
    매도호가 건수12         , askcnt12              , askcnt12             , long   ,   15;
    매수호가 건수12         , bidcnt12              , bidcnt12             , long   ,   15;
    직전매도대비수량12      , bfrsellcompqty12      , bfrsellcompqty12     , double ,   20;
    직전매수대비수량12      , bfrbuycompqty12       , bfrbuycompqty12      , double ,   20;
    매도호가13              , ask13                 , ask13                 , char ,   20;
    매수호가13              , bid13                 , bid13                 , char ,   20;
    매도호가 잔량13         , askrest13             , askrest13             , char ,   20;
    매수호가 잔량13         , bidrest13             , bidrest13             , char ,   20;
    매도호가 건수13         , askcnt13              , askcnt13              , long   ,   15;
    매수호가 건수13         , bidcnt13              , bidcnt13              , long   ,   15;
    직전매도대비수량3      , bfrsellcompqty13      , bfrsellcompqty13      , double ,   20;
    직전매수대비수량3      , bfrbuycompqty13       , bfrbuycompqty13       , double ,   20;
    매도호가14              , ask14                 , ask14                 , char ,   20;
    매수호가14              , bid14                 , bid14                 , char ,   20;
    매도호가 잔량14         , askrest14             , askrest14             , char ,   20;
    매수호가 잔량14         , bidrest14             , bidrest14             , char ,   20;
    매도호가 건수14         , askcnt14              , askcnt14              , long   ,   15;
    매수호가 건수14         , bidcnt14              , bidcnt14              , long   ,   15;
    직전매도대비수량4      , bfrsellcompqty14      , bfrsellcompqty14      , double ,   20;
    직전매수대비수량4      , bfrbuycompqty14       , bfrbuycompqty14       , double ,   20;
    매도호가15              , ask15                 , ask15                 , char ,   20;
    매수호가15              , bid15                 , bid15                 , char ,   20;
    매도호가 잔량15         , askrest15             , askrest15             , char ,   20;
    매수호가 잔량15         , bidrest15             , bidrest15             , char ,   20;
    매도호가 건수15         , askcnt15              , askcnt15              , long   ,   15;
    매수호가 건수15         , bidcnt15              , bidcnt15              , long   ,   15;
    직전매도대비수량5      , bfrsellcompqty15      , bfrsellcompqty15      , double ,   20;
    직전매수대비수량5      , bfrbuycompqty15       , bfrbuycompqty15       , double ,   20;
    매도호가16              , ask16                 , ask16                 , char ,   20;
    매수호가16              , bid16                 , bid16                 , char ,   20;
    매도호가 잔량16         , askrest16             , askrest16             , char ,   20;
    매수호가 잔량16         , bidrest16             , bidrest16             , char ,   20;
    매도호가 건수16         , askcnt16              , askcnt16              , long   ,   15;
    매수호가 건수16         , bidcnt16              , bidcnt16              , long   ,   15;
    직전매도대비수량6      , bfrsellcompqty16      , bfrsellcompqtyl6      , double ,   20;
    직전매수대비수량6      , bfrbuycompqty16       , bfrbuycompqty16       , double ,   20;
    매도호가17              , ask17                 , ask17                 , char ,   20;
    매수호가17              , bid17                 , bid17                 , char ,   20;
    매도호가 잔량17         , askrest17             , askrest17             , char ,   20;
    매수호가 잔량17         , bidrest17             , bidrest17             , char ,   20;
    매도호가 건수17         , askcnt17              , askcnt17              , long   ,   15;
    매수호가 건수17         , bidcnt17              , bidcnt17              , long   ,   15;
    직전매도대비수량17      , bfrsellcompqty7      , bfrsellcompqty17      , double ,   20;
    직전매수대비수량17      , bfrbuycompqty7       , bfrbuycompqty17       , double ,   20;
    매도호가18              , ask18                 , ask18                 , char ,   20;
    매수호가18              , bid18                 , bid18                 , char ,   20;
    매도호가 잔량18         , askrest18             , askrest18             , char ,   20;
    매수호가 잔량18         , bidrest18             , bidrest18             , char ,   20;
    매도호가 건수18         , askcnt18              , askcnt18              , long   ,   15;
    매수호가 건수18         , bidcnt18              , bidcnt18              , long   ,   15;
    직전매도대비수량18      , bfrsellcompqty18      , bfrsellcompqty18      , double ,   20;
    직전매수대비수량18      , bfrbuycompqty18       , bfrbuycompqty18       , double ,   20;
    매도호가19              , ask19                 , ask19                 , char ,   20;
    매수호가19              , bid19                 , bid19                 , char ,   20;
    매도호가 잔량19         , askrest19             , askrest19             , char ,   20;
    매수호가 잔량19         , bidrest19             , bidrest19             , char ,   20;
    매도호가 건수19         , askcnt19              , askcnt19              , long   ,   15;
    매수호가 건수19         , bidcnt19              , bidcnt19              , long   ,   15;
    직전매도대비수량19      , bfrsellcompqty19      , bfrsellcompqty19      , double ,   20;
    직전매수대비수량19      , bfrbuycompqty19       , bfrbuycompqty19       , double ,   20;
    매도호가20             , ask20                , ask20                , char ,   20;
    매수호가20             , bid20                , bid20                , char ,   20;
    매도호가 잔량20        , askrest20            , askrest20            , char ,   20;
    매수호가 잔량20        , bidrest20            , bidrest20            , char ,   20;
    매도호가 건수20        , askcnt20             , askcnt20             , long   ,   15;
    매수호가 건수20        , bidcnt20             , bidcnt20             , long   ,   15;
    직전매도대비수량20     , bfrsellcompqty20     , bfrsellcompqty20     , double ,   20;
    직전매수대비수량20     , bfrbuycompqty20      , bfrbuycompqty20      , double ,   20;
	매도호가21              , ask21                 , ask21                 , char ,   20;
    매수호가21              , bid21                 , bid21                 , char ,   20;
    매도호가 잔량21         , askrest21             , askrest21             , char ,   20;
    매수호가 잔량21         , bidrest21             , bidrest21             , char ,   20;
    매도호가 건수21         , askcnt21              , askcnt21              , long   ,   15;
    매수호가 건수21         , bidcnt21              , bidcnt21              , long   ,   15;
    직전매도대비수량21      , bfrsellcompqty21      , bfrsellcompqty21      , double ,   20;
    직전매수대비수량21      , bfrbuycompqty21       , bfrbuycompqty21       , double ,   20;
    매도호가22              , ask22                 , ask22                 , char ,   20;
    매수호가22              , bid22                 , bid22                 , char ,   20;
    매도호가 잔량22         , askrest22             , askrest22             , char ,   20;
    매수호가 잔량22         , bidrest22             , bidrest22             , char ,   20;
    매도호가 건수22         , askcnt22              , askcnt22              , long   ,   15;
    매수호가 건수22         , bidcnt22              , bidcnt22              , long   ,   15;
    직전매도대비수량22      , bfrsellcompqty22      , bfrsellcompqty22      , double ,   20;
    직전매수대비수량22      , bfrbuycompqty22       , bfrbuycompqty22       , double ,   20;
    매도호가23              , ask23                 , ask23                 , char ,   20;
    매수호가23              , bid23                 , bid23                 , char ,   20;
    매도호가 잔량23         , askrest23             , askrest23             , char ,   20;
    매수호가 잔량23         , bidrest23             , bidrest23             , char ,   20;
    매도호가 건수23         , askcnt23              , askcnt23              , long   ,   15;
    매수호가 건수23         , bidcnt23              , bidcnt23              , long   ,   15;
    직전매도대비수량23      , bfrsellcompqty23      , bfrsellcompqty23      , double ,   20;
    직전매수대비수량23      , bfrbuycompqty23       , bfrbuycompqty23       , double ,   20;
    매도호가24              , ask24                 , ask24                 , char ,   20;
    매수호가24              , bid24                 , bid24                 , char ,   20;
    매도호가 잔량24         , askrest24             , askrest24             , char ,   20;
    매수호가 잔량24         , bidrest24             , bidrest24             , char ,   20;
    매도호가 건수24         , askcnt24              , askcnt24              , long   ,   15;
    매수호가 건수24         , bidcnt24              , bidcnt24              , long   ,   15;
    직전매도대비수량24      , bfrsellcompqty24      , bfrsellcompqty24      , double ,   20;
    직전매수대비수량24      , bfrbuycompqty24       , bfrbuycompqty24       , double ,   20;
    매도호가25              , ask25                 , ask25                 , char ,   20;
    매수호가25              , bid25                 , bid25                 , char ,   20;
    매도호가 잔량25         , askrest25             , askrest25             , char ,   20;
    매수호가 잔량25         , bidrest25             , bidrest25             , char ,   20;
    매도호가 건수25         , askcnt25              , askcnt25              , long   ,   15;
    매수호가 건수25         , bidcnt25              , bidcnt25              , long   ,   15;
    직전매도대비수량25      , bfrsellcompqty25      , bfrsellcompqty25      , double ,   20;
    직전매수대비수량25      , bfrbuycompqty25       , bfrbuycompqty25       , double ,   20;
    매도호가26              , ask26                 , ask26                 , char ,   20;
    매수호가26              , bid26                 , bid26                 , char ,   20;
    매도호가 잔량26         , askrest26             , askrest26             , char ,   20;
    매수호가 잔량26         , bidrest26             , bidrest26             , char ,   20;
    매도호가 건수26         , askcnt26              , askcnt26              , long   ,   15;
    매수호가 건수26         , bidcnt26              , bidcnt26              , long   ,   15;
    직전매도대비수량26      , bfrsellcompqty26      , bfrsellcompqty26      , double ,   20;
    직전매수대비수량26      , bfrbuycompqty26       , bfrbuycompqty26       , double ,   20;
    매도호가27              , ask27                 , ask27                 , char ,   20;
    매수호가27              , bid27                 , bid27                 , char ,   20;
    매도호가 잔량27         , askrest27             , askrest27             , char ,   20;
    매수호가 잔량27         , bidrest27             , bidrest27             , char ,   20;
    매도호가 건수27         , askcnt27              , askcnt27              , long   ,   15;
    매수호가 건수27         , bidcnt27              , bidcnt27              , long   ,   15;
    직전매도대비수량27      , bfrsellcompqty27      , bfrsellcompqty27      , double ,   20;
    직전매수대비수량27      , bfrbuycompqty27       , bfrbuycompqty27       , double ,   20;
    매도호가28              , ask28                 , ask28                 , char ,   20;
    매수호가28              , bid28                 , bid28                 , char ,   20;
    매도호가 잔량28         , askrest28             , askrest28             , char ,   20;
    매수호가 잔량28         , bidrest28             , bidrest28             , char ,   20;
    매도호가 건수28         , askcnt28              , askcnt28              , long   ,   15;
    매수호가 건수28         , bidcnt28              , bidcnt28              , long   ,   15;
    직전매도대비수량28      , bfrsellcompqty28      , bfrsellcompqty28      , double ,   20;
    직전매수대비수량28      , bfrbuycompqty28       , bfrbuycompqty28       , double ,   20;
    매도호가29              , ask29                 , ask29                 , char ,   20;
    매수호가29              , bid29                 , bid29                 , char ,   20;
    매도호가 잔량29         , askrest29             , askrest29             , char ,   20;
    매수호가 잔량29         , bidrest29             , bidrest29             , char ,   20;
    매도호가 건수29         , askcnt29              , askcnt29              , long   ,   15;
    매수호가 건수29         , bidcnt29              , bidcnt29              , long   ,   15;
    직전매도대비수량29      , bfrsellcompqty29     , bfrsellcompqty29     , double ,   20;
    직전매수대비수량29      , bfrbuycompqty29      , bfrbuycompqty29      , double ,   20;
    매도호가30             , ask30                , ask30                , char ,   20;
    매수호가30             , bid30                , bid30                , char ,   20;
    매도호가 잔량30        , askrest30            , askrest30            , char ,   20;
    매수호가 잔량30        , bidrest30            , bidrest30            , char ,   20;
    매도호가 건수30        , askcnt30             , askcnt30             , long   ,   15;
    매수호가 건수30        , bidcnt30             , bidcnt30             , long   ,   15;
    직전매도대비수량30     , bfrsellcompqty30     , bfrsellcompqty30     , double ,   20;
    직전매수대비수량30     , bfrbuycompqty30      , bfrbuycompqty30      , double ,   20;
    10단계호가매도총잔량   , asktotal             , asktotal             , double ,   20;
    10단계호가매수총잔량   , bidtotal             , bidtotal             , double ,   20;
    10단계호가매도총건수   , asktotalcnt          , asktotalcnt          , long   ,   15;
    10단계호가매수총건수   , bidtotalcnt          , bidtotalcnt          , long   ,   15;
    직전매도대비총수량     , bfraskcomptotal      , bfraskcomptotal      , double ,   20;
    직전매수대비총수량     , bfrbidcomptotal      , bfrbidcomptotal      , double ,   20;
    end
    END_DATA_MAP
END_FUNCTION_MAP
