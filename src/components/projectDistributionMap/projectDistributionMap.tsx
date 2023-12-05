import styles from "./projectDistributionMap.module.scss";
import * as echarts from "echarts";

import mapJson from "@/utils/china.json";
import mapDatas from "@/utils/map";

interface MapData {
  name: String;
  value: Number;
  map: Function;
}

// interface propsData{
//   styleData:Object;
// }

import React, { useEffect, useRef, useState } from "react";

const ProjectDistributionMap = () => {
  echarts.registerMap("china", { geoJSON: mapJson });
  const map = useRef(null);
  let chartInstance = null;
  const categoryData = [] as any;
  const mapData = [] as any;
  const barData = [] as any;

  for (const key in mapDatas.geoCoordMap) {
    categoryData.push(key);
    mapData.push({
      year: new Date().getFullYear(),
      name: key,
      value: Math.floor(Math.random()* (200-1) + 1),
    });
  }

  mapData.forEach((item: MapData) => {
    barData.push(item.value);
  });

  const convertData = (data: any) => {
    console.log(data,'data');
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = mapDatas.geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  const convertToLineData = (data: any, gps: any) => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = mapDatas.geoCoordMap[dataItem.name];
      var toCoord = gps; //重庆
      if (fromCoord && toCoord) {
        res.push([
          {
            coord: fromCoord,
            value: dataItem.value,
          },
          {
            coord: toCoord,
          },
        ]);
      }
    }
    return res;
  };

  const optionGroup = {
    timeline: {
      show: false,
    },
    baseOption: {
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicInOut",
      animationDurationUpdate: 1000,
      animationEasingUpdate: "cubicInOut",
      grid: {
        right: "1%",
        top: "15%",
        bottom: "10%",
        width: "20%",
      },
      tooltip: {
        trigger: "axis", // hover触发器
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          shadowStyle: {
            color: "rgba(150,150,150,0.1)", //hover颜色
          },
        },
      },
      geo: {
        show: true,
        map: "china",
        roam: true,
        zoom: 1,
        center: [113.83531246, 34.0267395887],
        label: {
          emphasis: {
            label: {
              show: false,
            },
          },
        },
        itemStyle: {
          borderColor: "rgba(147, 235, 248, 1)",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          shadowColor: "rgba(128, 217, 248, 1)",
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
          emphasis: {
            itemStyle: {
              areaColor: "#389BB7",
              borderWidth: 0,
            },
          },
        },
      },
    },
    options: [
      {
        backgroundColor: "#051b4a",
        title: [
          {
            id: "statistic",
            text: new Date().getFullYear() + "年数据统计情况",
            left: "75%",
            top: "8%",
            textStyle: {
              color: "#fff",
              fontSize: 30,
            },
          },
        ],
        xAxis: {
          type: "value",
          scale: true,
          position: "top",
          min: 0,
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: "#aaa",
            },
          },
        },
        yAxis: {
          type: "category",
          nameGap: 16,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#ddd",
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#ddd",
            },
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#ddd",
            },
          },
          data: categoryData,
        },
        series: [
          //未知作用
          {
            //文字和标志
            name: "light",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(new Date().getFullYear()),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            itemStyle: {
              color: "#04B9FF",
            },
          },
          //地图？
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              show: false,
              emphasis: {
                label: {
                  show: false,
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              areaColor: "#031525",
              borderColor: "#FFFFFF",
              emphasis: {
                itemStyle: {
                  areaColor: "#2B91B7",
                },
              },
            },
            animation: false,
            data: mapData,
          },
          //地图点的动画效果
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              mapData
                .sort(function (a: any, b: any) {
                  return b.value - a.value;
                })
            ),
            symbolSize: function (val: any) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#04B9FF",
              shadowBlur: 10,
              shadowColor: "#04B9FF",
            },
            zlevel: 1,
          },
          //地图线的动画效果
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 3, //图标大小
            },
            lineStyle: {
              color: "#EEDD78",
              width: 0.5, //尾迹线条宽度
              opacity: 0.5, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
            data: convertToLineData(mapData, mapDatas.geoGpsMap["center"]),
          },
          //柱状图
          {
            zlevel: 1.5,
            type: "bar",
            symbol: "none",
            itemStyle: {
              color: "#04B9FF",
            },
            data: barData,
          },
        ],
      },
    ] as any,
  };

  const renderMap = () => {
    const myChart = echarts.getInstanceByDom(
      map.current as unknown as HTMLDivElement
    );
    if (myChart) {
      chartInstance = myChart;
    } else {
      chartInstance = echarts.init(map.current as unknown as HTMLDivElement);
    }
    optionGroup && chartInstance.setOption(optionGroup as any);
  };

  useEffect(() => {
    renderMap();
  });

  return (
    <>
      <div ref={map} id={styles.mapDom}></div>
    </>
  );
};

export default ProjectDistributionMap;
