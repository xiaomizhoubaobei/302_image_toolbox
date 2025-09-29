import { Stage, Layer, Circle } from 'react-konva';

function Canvas() {
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}

export default Canvas;