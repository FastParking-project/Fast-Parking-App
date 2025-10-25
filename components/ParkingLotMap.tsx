import React, { useState, useRef, useCallback } from 'react';
import { Stage, Layer, Rect, Text, Group, Path, Circle } from 'react-konva';
import Konva from 'konva';
import { MapElement, ParkingSpace } from '@/types';

// --- Colores de la UI ---
const COLORS = {
  selected: '#FFCC00', // fp-yellow
  accessible: '#DBEAFE', // blue-100
  accessibleStroke: '#3B82F6', // blue-500
  availableHover: 'rgba(255, 255, 255, 0.2)',
  occupiedFill: 'rgba(0, 0, 0, 0.4)',
  line: '#FFFFFF',
  text: '#FFFFFF',
  textOccupied: '#A0A0A0',
  carIcon: '#E0E0E0'
};

// --- Iconos redibujados para Konva ---

const KonvaWheelchairIcon: React.FC<{ x: number; y: number; size: number; color: string; }> = ({ x, y, size, color }) => (
  <Path
    x={x}
    y={y}
    data="M4.5,3 A1.25,1.25 0 1,1 5.75,1.75 A1.25,1.25 0 0,1 4.5,3 M8,7 H5.5 a0.5,0.5 0 0,1 -0.5,-0.5 V6 h2 a0.5,0.5 0 0,0 0,-1 H5 V4 a0.5,0.5 0 0,0 -1,0 v2.5 a1.5,1.5 0 0,0 1.5,1.5 h2.27 l1.85,2.158 a0.5,0.5 0 0,0 0.7,0.059 l1,-0.833 a0.5,0.5 0 0,0 -0.641,-0.769 l-0.621,0.519 L8.38,7.175 A0.5,0.5 0 0,0 8,7 M4.5,11.5 a4,4 0 0,0 3.283,-1.714 a0.5,0.5 0 0,0 -0.82,-0.572 a3,3 0 1,1 -3.75,-4.425 a0.5,0.5 0 0,0 -0.429,-0.903 A4,4 0 0,0 4.5,11.5"
    fill={color}
    scale={{ x: size / 12, y: size / 12 }}
    listening={false}
  />
);

const KonvaTopDownCar: React.FC<{
  width: number;
  height: number;
  color: string;
}> = ({ width, height, color }) => {
  const halfW = width / 2;
  const halfH = height / 2;
  const cornerRadius = width * 0.25;

  // Body
  const bodyPath = `M ${-halfW} ${-halfH + cornerRadius} C ${-halfW} ${-halfH} ${-halfW + cornerRadius} ${-halfH} 0 ${-halfH} C ${halfW - cornerRadius} ${-halfH} ${halfW} ${-halfH} ${halfW} ${-halfH + cornerRadius} L ${halfW} ${halfH - cornerRadius} C ${halfW} ${halfH} ${halfW - cornerRadius} ${halfH} 0 ${halfH} C ${-halfW + cornerRadius} ${halfH} ${-halfW} ${halfH} ${-halfW} ${halfH - cornerRadius} Z`;

  // Windshield
  const windshieldPath = `M ${-halfW * 0.8} ${-halfH * 0.8} L ${halfW * 0.8} ${-halfH * 0.8} L ${halfW * 0.7} ${-halfH * 0.2} L ${-halfW * 0.7} ${-halfH * 0.2} Z`;

  return (
    <Group listening={false}>
      <Path data={bodyPath} fill={color} />
      <Path data={windshieldPath} fill="rgba(0,0,0,0.2)" />
    </Group>
  );
};

const ParkingSpaceShape: React.FC<{
  space: ParkingSpace;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ space, isSelected, onSelect }) => {
  const [isHover, setIsHover] = useState(false);

  const getSpaceFill = () => {
    if (isSelected) return COLORS.selected;
    if (space.status === 'accessible') return COLORS.accessible;
    if (space.status === 'occupied') return COLORS.occupiedFill;
    return isHover ? COLORS.availableHover : 'transparent';
  };
  
  const getStrokeColor = () => {
    if (isSelected) return COLORS.selected;
    if (space.status === 'accessible') return COLORS.accessibleStroke;
    return COLORS.line;
  };
  
  const rotation = space.rotation || 0;
  const groupProps = {
    x: space.x,
    y: space.y,
    rotation,
    // Since x/y is top-left, we offset by half width/height to rotate around the center
    offsetX: space.width / 2,
    offsetY: space.height / 2,
    // And then move the group to the correct centered position
    // This seems counter-intuitive, but it's how Konva rotation works.
    // A better approach is to have x/y be the center from the API.
    // For now, let's adjust visually by adding the offset back.
    // Correct approach: Group at center, Rect at -width/2, -height/2.
    // x={space.x + space.width / 2}
    // y={space.y + space.height / 2}
    // offsetX={0}
    // offsetY={0}
    onClick: space.status !== 'occupied' ? onSelect : undefined,
    onTap: space.status !== 'occupied' ? onSelect : undefined,
    onMouseEnter: () => space.status !== 'occupied' && setIsHover(true),
    onMouseLeave: () => space.status !== 'occupied' && setIsHover(false),
  };

  return (
    <Group {...groupProps} x={space.x + space.width / 2} y={space.y + space.height / 2}>
      <Rect
        x={-space.width / 2}
        y={-space.height / 2}
        width={space.width}
        height={space.height}
        fill={getSpaceFill()}
        stroke={getStrokeColor()}
        strokeWidth={isSelected || space.status === 'accessible' ? 2 : 1.5}
        shadowColor="black"
        shadowBlur={isSelected ? 10 : 0}
        shadowOpacity={0.5}
      />
      <Text
        text={space.label}
        x={-space.width / 2}
        y={-space.height / 2 - 12} // Position label outside, above the space
        width={space.width}
        align="center"
        fontSize={9}
        fontStyle="bold"
        fill={space.status === 'occupied' ? COLORS.textOccupied : COLORS.text}
        listening={false}
      />
      {space.status === 'accessible' && (
        <KonvaWheelchairIcon
          x={-6} // Centered
          y={-8} // Centered
          size={16}
          color={COLORS.accessibleStroke}
        />
      )}
      {space.status === 'occupied' && (
        <KonvaTopDownCar
          width={space.width * 0.8}
          height={space.height * 0.9}
          color={COLORS.carIcon}
        />
      )}
    </Group>
  );
};

// FIX: Added ParkingLotMapProps interface to define component props and resolve type error.
interface ParkingLotMapProps {
  mapElements: MapElement[];
  selectedSpaceId: string | null;
  onSelectSpace: (space: ParkingSpace) => void;
  children?: React.ReactNode;
}

const ParkingLotMap: React.FC<ParkingLotMapProps> = ({ mapElements, selectedSpaceId, onSelectSpace, children }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [stage, setStage] = useState({ scale: 1, x: 0, y: 0 });

  const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = stageRef.current;
    if (!stage) return;
  
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
  
    // FIX: Corrected typo from 'scaleby' to 'scaleBy' for zoom out functionality.
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
  
    setStage({
      scale: newScale,
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  }, []);

  return (
    <div className="w-full h-full bg-gray-800 dark:bg-gray-900 rounded-lg shadow-inner cursor-grab active:cursor-grabbing">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        draggable
        ref={stageRef}
      >
        <Layer>
          {mapElements.map((element) => {
            if (element.kind === 'obstacle') {
              return (
                <Rect
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  fill={element.fill}
                  stroke={element.stroke}
                  strokeWidth={(element as any).strokeWidth || 1}
                  cornerRadius={element.borderRadius}
                />
              );
            }
            if (element.kind === 'decoration') {
              return (
                <Path
                  key={element.id}
                  data={element.d}
                  fill={element.fill}
                  stroke={element.stroke || '#FFCC00'}
                  strokeWidth={typeof element.strokeWidth === 'number' ? element.strokeWidth : 2}
                  transform={element.transform}
                  listening={false}
                />
              )
            }
            const space = element;
            return (
              <ParkingSpaceShape
                key={space.id}
                space={space}
                isSelected={selectedSpaceId === space.id}
                onSelect={() => onSelectSpace(space)}
              />
            );
          })}
        </Layer>
        {/* Children se renderiza en una capa superior para la navegación */}
        {children}
      </Stage>
    </div>
  );
};

export default ParkingLotMap;