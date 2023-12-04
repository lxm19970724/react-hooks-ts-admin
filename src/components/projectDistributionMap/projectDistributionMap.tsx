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
  const yearsData = ["2014", "2015", "2016", "2017", "2018"];
  const mapData = [] as any;
  const barData = [] as any;
  let colorIndex = 0 as any;
  const colors = [
    [
      "#1DE9B6",
      "#F46E36",
      "#04B9FF",
      "#5DBD32",
      "#FFC809",
      "#FB95D5",
      "#BDA29A",
      "#6E7074",
      "#546570",
      "#C4CCD3",
    ],
    [
      "#37A2DA",
      "#67E0E3",
      "#32C5E9",
      "#9FE6B8",
      "#FFDB5C",
      "#FF9F7F",
      "#FB7293",
      "#E062AE",
      "#E690D1",
      "#E7BCF3",
      "#9D96F5",
      "#8378EA",
      "#8378EA",
    ],
    [
      "#DD6B66",
      "#759AA0",
      "#E69D87",
      "#8DC1A9",
      "#EA7E53",
      "#EEDD78",
      "#73A373",
      "#73B9BC",
      "#7289AB",
      "#91CA8C",
      "#F49F42",
    ],
  ];

  yearsData.map((item: string, index: number) => {
    mapData[index] = [];
  });

  for (const key in mapDatas.geoCoordMap) {
    categoryData.push(key);
    mapData[0].push({
      year: "2014",
      name: key,
      value: 200,
    });
    mapData[1].push({
      year: "2015",
      name: key,
      value: 200,
    });
    mapData[2].push({
      year: "2016",
      name: key,
      value: 200,
    });
    mapData[3].push({
      year: "2017",
      name: key,
      value: 200,
    });
    mapData[4].push({
      year: "2018",
      name: key,
      value: 200,
    });
  }

  mapData.forEach((item: MapData, index: number) => {
    barData.push([]);
    item.map((ite: any, ind: number) => {
      barData[index].push(mapData[index][ind].value);
    });
  });

  const convertData = (data: any) => {
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
      var toCoord = gps; //郑州
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

  const optionXyMap01 = {
    timeline: {
      data: yearsData,
      axisType: "category",
      autoPlay: true,
      playInterval: 3000,
      left: "10%",
      right: "10%",
      bottom: "3%",
      width: "80%",
      label: {
        normal: {
          textStyle: {
            color: "#ddd",
          },
        },
        emphasis: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      symbolSize: 10,
      lineStyle: {
        color: "#555",
      },
      checkpointStyle: {
        borderColor: "#777",
        borderWidth: 2,
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        normal: {
          color: "#666",
          borderColor: "#666",
        },
        emphasis: {
          color: "#aaa",
          borderColor: "#aaa",
        },
      },
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
            show: false,
          },
        },
        itemStyle: {
          normal: {
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
          },
          emphasis: {
            areaColor: "#389BB7",
            borderWidth: 0,
          },
        },
      },
    },
    options: [] as any,
  };

  yearsData.map((item: any, index: number) => {
    optionXyMap01.options.push({
      backgroundColor: "#051b4a",
      title: [
        {
          /* text: '地图',
                 subtext: '内部数据请勿外传',
                 left: 'center',
                 textStyle: {
                     color: '#fff'
                 }*/
        },
        {
          id: "statistic",
          text: item + "年数据统计情况",
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
          data: convertData(item),
          symbolSize: function (val: any) {
            return val[2] / 10;
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: colors[colorIndex][index],
            },
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
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
              textStyle: {
                color: "#fff",
              },
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#FFFFFF",
            },
            emphasis: {
              areaColor: "#2B91B7",
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
            mapData[index]
              .sort(function (a: any, b: any) {
                return b.value - a.value;
              })
              .slice(0, 20)
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
            normal: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: colors[colorIndex][index],
              shadowBlur: 10,
              shadowColor: colors[colorIndex][index],
            },
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
            normal: {
              color: colors[colorIndex][index],
              width: 0.1, //尾迹线条宽度
              opacity: 0.5, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
          },
          data: convertToLineData(
            mapData[index],
            mapDatas.geoGpsMap[Math.ceil(Math.random() * 6)]
          ),
        },
        //柱状图
        {
          zlevel: 1.5,
          type: "bar",
          symbol: "none",
          itemStyle: {
            normal: {
              color: colors[colorIndex][index],
            },
          },
          data: barData[index],
        },
      ],
    });
  });

  const renderMap = () => {
    const myChart = echarts.getInstanceByDom(
      map.current as unknown as HTMLDivElement
    );
    if (myChart) {
      chartInstance = myChart;
    } else {
      chartInstance = echarts.init(map.current as unknown as HTMLDivElement);
    }
    optionXyMap01 && chartInstance.setOption(optionXyMap01 as any);
  };

  useEffect(() => {
    renderMap();
  });

  return (
    <>
      <div ref={map} id={styles.mapDom}>
        地图组件
      </div>
    </>
  );
};

export default ProjectDistributionMap;
