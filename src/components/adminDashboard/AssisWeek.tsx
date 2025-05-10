import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import dayjs from 'dayjs';
import { fetchAssistDay } from '../../api/dashboardAdmin';

export default function AssisWeek() {
  const [data, setData] = useState<number[]>([0, 0, 0, 0, 0]); // [Lun, Mar, Mié, Jue, Vie]
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number } | null>(null);
  const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];

  useEffect(() => {
    const getData = async () => {
      try {
        const assists = await fetchAssistDay();
        const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        assists.forEach((item: any) => {
          const weekday = dayjs(item.fecha).day();
          if (weekday >= 1 && weekday <= 5) {
            counts[weekday] += 1;
          }
        });
        setData([counts[1], counts[2], counts[3], counts[4], counts[5]]);
      } catch (error) {
        console.error('Error al obtener los datos semanales:', error);
      }
    };

    getData();
  }, []);

  const weeklyData = {
    labels: labels,
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(77, 150, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width - 32;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(77, 150, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(75, 85, 99, ${opacity})`,
    style: {
      borderRadius: 12,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffffff',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e5e7eb',
      strokeWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencias esta semana</Text>
      <LineChart
        data={weeklyData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        withDots={true}
        withShadow={false}
        segments={4}
        yAxisSuffix=""
        yAxisInterval={1}
        fromZero={true}
        onDataPointClick={(data) => {
          // data contiene { index, value, x, y }
          // Si tocamos dos veces en el mismo punto se oculta el tooltip
          if (tooltip && tooltip.x === data.x && tooltip.y === data.y) {
            setTooltip(null);
          } else {
            setTooltip({ x: data.x, y: data.y, value: data.value });
          }
        }}
      />
      {tooltip && (
        <View
          style={[
            styles.tooltip,
            { left: tooltip.x - 25, top: tooltip.y - 40 } // Ajustar posición según necesidad
          ]}
        >
          <Text style={styles.tooltipText}>{tooltip.value}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
        color: '#333',
        fontFamily: 'Inter_600SemiBold',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 8,
        alignSelf: 'center',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: '#2563eb',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    tooltipText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
});