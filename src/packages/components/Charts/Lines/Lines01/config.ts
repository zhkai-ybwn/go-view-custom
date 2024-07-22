import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Lines01Config } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

const colorList = ['#2C9745', '#4DE748', '#4881FF', '#4ADEFF']

// const icon = {
//   checked:
//     'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBpZLNykFRFIbftZ3viyQ/mZ2JInED3IIhUyUDU5EbEBMpE4ULkAswNVKuwpCJkgEnvwM/yzl75v8cnsl612o/7V17UbCwyNqImwB7YI7pmUWFwsX5RG8CsAADmrAqGRDgEfiSj2JU/cOw7EdEVcyLqs+GTs4t8+bA78VUzC6ry0Ho5b0yZ9orzJbnm3PK7bMU1NNuxEP/uijkjcnG8kF6EMezE9qDHfIJp+xr/Y0+O+IZyv2gNdjKuj5c0B3t8QpjARhf8Ms/kgbrTAXTpWQE8w5pTFy9Am4EPKlshT4ZAAAAAElFTkSuQmCC',
//   normal:
//     'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgB7ZMhDsJAEEXfbJcEuYoEEkhDQsBxAAwSZDWGI3ADjsARuBISRaoQqJU0bBmWE7Cksn1uJnn55n8hstruDoIcURwJKFpqrYX9HqJy4g9iUC6Gs11v9nkgUIcXj/vtp5jZHoPRFBWcoQGd3A7Z0sdT4WNz3HAyTxZjpX1WXi/P8WxZGWQRf0nDQMS/jS0+N/IiSAappcsAAAAASUVORK5CYII='
// }

const item1 =
  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAYAAACJISRoAAAAAXNSR0IArs4c6QAABXRJREFUSEu9lk1oXUUUx885M3M/8t5LmqYvfjTUIFklfiAPrFQL14ULPwIqvCCIbtRS/ALdiYvcuHYjguhGtKAL704F3flA0NXTVRVKiFFsNX22iXl5737NzLFzk9omTVE3zubdN/fO/M7/nJn/DML/0PB/YMA/QxgQEJiZ0T3s2xC46t/5du83+49iQN4ZEQNgDABRJyKItoe7nw4ANKHJkLieBJIfgGOIIV6MHWobutOugbiIl5aW8PTiaUwggVa3RVmY4ZHZI5iuprgsl3FGz3Auc/S1z73png26ATdaDW4mTZ5rz/EiLDJiNXUFuwYSc0zuRQc6FEIo3MRe6IlABLS2sYYHDwLUsYFbrFjZTc5Mzfr2AuvBpKkXvzDMzpoEEjf534p2QZyKhWSBknaCM8szYqw2JoLNQISTIQkhxARLzrZsrSBBaZbmckKWcmPAtt4wpjSmSAvTG/Zse7atLyWOq5Qj8hXITh3uh/tF84cerYwHctKXkoQSNBwXCNk0g3oKECSSZbAomPHrEu03pSn7OIJaa21gsKphdVpHUWRjjO016XKp+qz7mWhMNMRofVQZdVHqshZ4TC+y5TowEgGjxWpduFy7KKUu9fsGaWVjZEPTkMrNqU0zC1XarFsEu5S0oU0JJDT/27xKg1SFWahQmBcswzgwSAQmgUpIEDTkLS1AuEgNAxFJ+7ZR4vygGJThn2FZ/76uk/a+EKCt5QelaRipgqFHae1mZjwBDIIIxaP+03OPh08cZwYYmLJ8pb9wqsAi19YaIlwvtH2LMtKpTAtYBd2JOma3EgBoc1v0VnvKpUrkwtMiexYADjsVd8ijN74cLj62d6M9s/XQu4CgXT+V6VsXrb5gyGTfrn2roQUOYnetruirSMI0yFSn3q21SW9L6DfQgtFg5ccHvjyZV1NdaYQArw2fOXWez/WtAUOMHxjdX/1dpTncBGV3qWsg3g3BNrfJKWla6esa+ZoxZkvGkpUfHfjyZHFdyO99ZjAi16cU4U8r4o8MzkE5//m8ieN4t5LL6To8GnpFAX5O9iQzHkKLaiE4cecD6tFjVysJFcBTGw+/Z4zVJAQL239naMI1T/yRnbsE6ba6etueLrdLz86nOquRd1iH3rDxZ4B65NZMqicIQLi6PB+8ft/d3r23ucIbZvvq4MkP+7yeupowYhkO0zdB5sWvAKk/5Zcd2KfwwEAPLs+o+thdKtO94BCPhRdk/hIb8JmQkK3weURJEtTXW6VQoI0FS0hcpcoWZ9fHZHr7YLz4frlX7ru6IAZqPdISE1MTnsp/8ybolpEcbW0o+DlEVMyWnFFU+it3YkuEjMhfjBr9IwwpsyyyYqaeJZC4Clb+tdsgGTCCSDR/zdV4UfN6NfJ9Az5ZDvpI96DCo8xYWUVFYVxvMH1aFuVFHzAbSF3UpciyC2fLOedf+9mK47pdDzAngrVvlBeiby7mXuZ5SpUgCyMV+GmoyBMlySJAm6JNTVaqwqis9Lx6fnYzLaLpyBmks5RrvWsnQGp1W5V/NWs9CfmoN6EasihYsshFnsvqKBABsW+11d6IzvVQ61SW4A0KmJoyAIlJtgH7nydVFpcATzxyQpzpnxGzkyCHIyCFzEmphtRotlM8qEFo1u2w0OacZ3U9oLICJIlJFq4A9j20LqtxR6lz5GNjk5TXpEjpZ7T9UCgZVko8K1mXqT14oGZP37Ciz3fH7Hxr3rh3l2tx3eP36n3jnl2NxrsrtN7K8PjyEfxOpjiQOda0z4Nhz47PBnym0+Cvoo5ZWrq01+LtOlzd/t1txcESIGgD9DoRNqPm9kUhAfiknVyxjT0XiH9Wsjecq9zBEXZFd53J/ztkL/Q//P8LdJXeOH1s9F0AAAAASUVORK5CYII='
const item2 =
  'image://data:image/png;base64,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'
const item3 =
  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAYAAACJISRoAAAAAXNSR0IArs4c6QAABVhJREFUSEu9lkuIXEUUhv9Tj3u7p1/pjJNkklFCyMaOIDKIGgy0G0VIFgot2YgbDQGV7NzOHddugiC6Ec1K7Z0KLtMg6MZWEKMQhjiEPJx0JhN7pvu+quo41Z1JMplJgpsUl1vcW4+v/nNOnSrCIyj0CBh4OISZQMQMJuL7LOl2CxOwtdf2EOZRz1uNo6rZgRghmqMHHQBTbYywbf/6Exyt19Ec2C/q7uVsgTAzzc+Dzs2B/ODZLkRSBD3RAMWLoAUFOmjAqQKFBtwbwhVicGUW7KGHWuA5wEvCBmwLJGIerbjTgSjOQMYKFPQhCyHEkgRhJ1C5CdIOrHeAEwsXOrAZwJYzMBqw7fl1hZFXOVa0CeJVvNGGaLdABxcgayXIQh+yqCFkAKkq4LCHUlaCiJeRqh3I1QrYFWFtBTaLYb2yVgMmAnhkcqKxqnFh71281IHsNSEKXShloPQ0ZF1DJgb7tcWbYCgIMDMkOfzoBH7KE6xSAGMS2MUJmP2LMM0mXETktijxpvquC1mZhKym0LYIZSZQEAO8R4wyM4S3AQkw/HBfM5RJ8bko4cLNBEYUkPf7sA1vNsB5v9xRwkwtb6oDEMf2QscxdLEIbVO8C6DuJyMBIRhSEETCMDRGWQEIh/RjKcNrgzXkxQB5+TeYdus+kLVnoGwFapgiqCPbm7vgBLxpCLI1gUOvV3HEmzW2yN9bxpnEIXWAJXYrLhCnxWWYeDcyrJus04TdrARAi1n2OtDV6etachgkE5W3wdjnVTwTYM+pKl67N/7fuo5PQTD+vzPp6cEwWbb1WvLzEgxmRxC3KbqaZ1lhP1RsEOxyq4EJKx/CwTqC+noPTqajqe4UQcAHN3BmyWHVMSzR8AtB+eI/vVoKIO9+D4toE4SpxRC9Regph9DwWpjIcgSCdQz11R6czB4A8f0o//eMCenv67Ka4AryY+uQaDPklrkWF/W+ajXIshvhWnrgJLN4TAL6eAlPv1zE4buVFDVw/Co+cwwjfaTh6idGriwFS/XkCqbz7izMXenJbxOmCKBOZzHYN1MNenSpUJaTB2LsOw6CJIZ6t4QXnyvhKe94y3CnlvHlvw6xIBgml5e5+xGGpexStRqHMzN5B9s4Hszi1YUFXa7VtDIXCzx0xZv62fdhEfrwBSALgPYhO7DIhYRhByclWOUXz+j0wuWVQiWuB7uz3sJMvm10IYrE7NGjcnJGBzrtBxOJnBDKlvp0+B2SQvvNOEpFnmJ83MIJASZ37Yed7ve/sOYSN1FLsoOVpI2G9+AoI29OkMzU7HTk1MFQIxsEpuTCcA1hTlkhpheed5h8jgSccIDzODYrZfH7t4gv3wgLQTKIVVauTyW/Lqu81WiYbdOK90sLbQEckoWlrg7yXWHf9ANprbYqV8KWdUY7ioEtSoRJVsBSTJZtkiKzUuYByullVcya+5smwrwDRVtz1zhPRmK2e1RWJlfl1PBPhWoYTOpcZVmgOEtkKsLRUSA5YOdSp1XNpOGKMXE9R3ApQ/8Vi8Y526aW2zbVjyHrx+080Ymjv8jzq9/Lxi6o4URNDRSLSW2VGWpCCcAAKNqhG2aZvRKwKRdq+QhwLrLtN765DdiShW/vgSgS0RzwXXdaHq79IdLSpIzFGrnVVGolR0oCt4dNft7t3PGkO7f7onm8m7q9s3stMIcNX2zMd/+LBI8PtBZaot6ti5XZFTqysEa/qt00uDqg0nSPB8MpV29c4POdY3y2Gdn5+YiiaOyHe3Pcvf82f2/A2hBoAb1Ok6aaU+OLQhv4ptW+kwBpfLH4/5CNEbdgI7fde27fZ/KHm+vB+v5X63/B5p04BzfEXgAAAABJRU5ErkJggg=='
const item4 =
  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAbCAYAAACJISRoAAAAAXNSR0IArs4c6QAABRxJREFUSEu9lk9sVEUcxz8z897bf63LbrvYFiGIoKYrakDFGNAmGk5ywKSNHrgpEtSjR+2riRdDTIiGqDFGOVIvin8uJpaQkHDAxJgKYlIhSsEW+m+33ff2vZmxb5eWFlqDHpjL2503bz6/P/P7/kZwB4a4AwxuA2IFCAvJ88awtvm7MSmS98lYWLvc9FUgViSbiPm3vo/wgR6QC5/2PANDJ6DUjWWwOVsu0wD5fvJcgC4xZLmFVgwMIIa7EYODsL2A3NSF6CgiKhOI36YRD+Sxs9OI8Ty2BKbQiT1/GVsaxiaw/n5sYuAC7FZPfCsTy4dAbi2ifplArM+hXIO8PIcotkFuDjGbxVZq2LzETM1iNxbRVyawdKMH+xpeLXp0U5yt6OtDlsuI00WUM4ESGVTKIu8KUKW12J8r5JRFtmrCbIaolsa2xeipEK3a0bPfYcplYr+fRtqEEEuTaUXC7hlAlUAGozhxJ04hjWpxUacqbBw17BPgkKzUqIzk5OYspwqWSqmNePIyehxiIO4B4/vCLB6OhZz4vpXHR1Fbu1Aygxu04gQh6RNTvI6hxQGpLMIIrE2OgcXGBqdT8dmOPCOjDnFLTMQMurcb3deHSfKyJFxW9B5DjvyA7OrC7Uzj4uB+OcVrSlJQ4CiQaQelJHI2JLZgtEXHIB9s5YOHWxm7OkZUvUbUcoV48BgmOd7LIb3IagdO++M4+hLe7xFdIyH7XYVyBergTsoHn2aXsVANiJ77kKPViLCu0VYwua/A4TGH2J2gfmGIeOhH9E0Q6O21aryMuymDG+fwvh3jZQfWOeD03EfH+y+w92aFeOwQH0WGOALuz3K4CNeyKYKRc8RnutD4SXSXjB7fOoCzzuLlWvEGZ3gnZdFJss+9xYEgXI6QAvZ+ytGRCSqRRXe5fF52uVAJCUdHifbMQ5Lk3xKuxJNSmlRakfqmgt+AGJyzb3MgrK8CmaQSge4wHH2iwB9jMwSrQG6Ea10Rz6uSOj7HASFo9wTum8/yyEvbeGopJpuGre/ycRATRwq7xeHIes3fAU3ImU+IG/K0RPJEolMXwIuKeHMh6YtVNl3UvNhIPDjv7WHn7m4eSj7UBrP7CF+MV6lFEFtB9HwLh2bnqP81TS2VJxrqXyHxSZ2cLuLeq3D/rJFuD8h8FfCGsqSSY6sEKufhOgJZCYk0xFGMMQq7GY5uUFwiTQ2P+vgM0ZA/n/jldZJIqJXbR1HdW/AmYrw2TbYSkzupeUUIXEwDJKQEY5reaIXthO+3Cc5WBUHWEtQFQbmf2G9oyLI6SSrYioasTONyN158lVRqDalqQHpY8+SUYoeUmKSOjQTXMvkofJ23TOgMgRXUW1yCYJaoPC8vK8pK0nSSqudX1HQVN99FKjeDN+ngegFOrHGnDBmhUBmot2eoTWu0sdSjOlHRI7wkqPckgHntSmrkFu1qHILrIWuto9iIk5rGy+ZxtMURLiqqIQlAtmA9MEoQBxDXakSFOnXyaIbRg4NN3VoZ0myzYv9+1PnroDVTOLU1SFvFSXs3TmRkMSZAyzHiqbVE96wAWAXS9Mbvh+OvotamkE4b6mIVkQlRnarZht0UdnQckytiRkLifIhJZCRpeAu5WCiPf7lINMWztxc5UkAGk4gNuxC1nxBhAZGaxI7PYtIj2NZWbEMMB+a9vJ6HpUV7m7eVhNb0oGccUSo1Lw3JaMr5os2L8/8RsrB8SVto9NVl26y4+W2E62ZR/////wHg2k04aGKTbQAAAABJRU5ErkJggg=='
const iconList = [item1, item2, item4, item3]

export const option = {
  isLinkage: true,
  linkageText: '运行',
  // title: {
  //   text: '我是标题',
  //   x: 'left',
  //   y: 'top',
  //   padding: [0, 0, 0, 10],
  //   textStyle: {
  //     color: 'rgba(255,255,255,0.8)',
  //     fontSize: 14,
  //     fontFamily: 'HarmonyOS-Regular, sans-serif',
  //     fontWeight: 400
  //   }
  // },
  legend: {
    show: true,
    type: 'scroll',
    top: '0px',
    right: '0px',
    orient: 'horizontal',
    itemHeight: 14,
    itemWidth: 14,
    itemGap: 5,
    icon: 'rect',
    data: [
      {
        name: '图例一',
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          color: colorList[0]
        },
        itemStyle: {
          color: colorList[0]
        }
      },
      {
        name: '图例二',
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          color: colorList[1]
        },
        itemStyle: {
          color: colorList[1]
        }
      },
      {
        name: '图例三',
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          color: colorList[2]
        },
        itemStyle: {
          color: colorList[2]
        }
      },
      {
        name: '图例四',
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'HarmonyOS-Regular, sans-serif',
          color: colorList[3]
        },
        itemStyle: {
          color: colorList[3]
        }
      }
    ],
    selected: {}
  },
  grid: {
    left: '10%',
    top: '60',
    right: '10%',
    bottom: '60'
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(6, 12, 28, 0.50)',
    borderColor: 'rgba(6, 12, 28, 0.50)',
    textStyle: {
      color: '#BCC4D0',
      fontFamily: 'HarmonyOS-Regular,sans-serif'
    },
    extraCssText: 'border:none; backdrop-filter: blur(4px)',
    formatter: (params: any) => {
      // params 是一个数组，包含了所有系列的数据信息
      let result = '' // 存储最终的提示框内容
      result += `${params[0].value.product}<br>`
      params.forEach((el: any, index: any) => {
        result += `<div style='display:flex;align-items:center;'><div style='width:10px;height:10px;margin-right:5px;background:${
          el.color
        }'></div><div>${el.seriesName}</div><div style="flex:1;margin-left:10px;text-align: right">${
          el.value[el.seriesName] ? el.value[el.seriesName] : '-'
        }℃</div></div>`
      })
      return result
    }
  },
  xAxis: [
    {
      type: 'category', // x轴为 时间轴
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dashed'
        }
      },
      // min: getMin(),
      // max: getMax(),
      axisLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontFamily: 'HarmonyOS-Regular,sans-serif',
        fontWeight: 400,
        formatter: (value: any) => {
          const timePattern = /^(\d{2})-(\d{2}) (\d{2}):(\d{2})$/
          const match = value.match(timePattern)
          if (match) {
            const hours = match[3]
            return `${hours}时`
          } else {
            return ''
          }
        }
      },
      axisTick: { show: false },
      // boundaryGap: ['20%', '20%'],
      axisLine: {
        lineStyle: {
          width: 2,
          color: '#8A9194'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#8a9194',
          width: 2
        }
      },
      axisLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontFamily: 'HarmonyOS-Regular,sans-serif',
        fontWeight: 400,
        formatter(value: any) {
          return value.toFixed(2) // 设置 Y 轴标签保留两位小数
        }
      },
      splitLine: {
        lineStyle: {
          width: 1,
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dashed'
        }
      }
    }
  ],
  dataset: { ...dataJson },
  series: [
    {
      type: 'line',
      color: colorList[0],
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      showSymbol: false,
      symbolSize: 25,
      symbol: iconList[0],
      itemStyle: {
        color: null,
        borderRadius: 0
      },
      lineStyle: {
        type: 'solid',
        width: 3
      },
      connectNulls: true
    },
    {
      type: 'line',
      color: colorList[1],
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      showSymbol: false,
      symbol: iconList[1],
      symbolSize: 25,
      itemStyle: {
        color: null,
        borderRadius: 0
      },
      lineStyle: {
        type: 'solid',
        width: 3
      },
      connectNulls: true
    },
    {
      type: 'line',
      color: colorList[2],
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      showSymbol: false,
      symbol: iconList[2],
      symbolSize: 25,
      itemStyle: {
        color: null,
        borderRadius: 0
      },
      lineStyle: {
        type: 'solid',
        width: 3
      },
      connectNulls: true
    },
    {
      type: 'line',
      color: colorList[3],
      label: {
        show: false,
        position: 'top',
        color: '#fff',
        fontSize: 12
      },
      showSymbol: false,
      symbol: iconList[3],
      symbolSize: 25,
      itemStyle: {
        color: null,
        borderRadius: 0
      },
      lineStyle: {
        type: 'solid',
        width: 3
      },
      connectNulls: true
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = Lines01Config.key
  public chartConfig = cloneDeep(Lines01Config)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
