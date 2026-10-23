/**
 * Central Scene Registry
 * Maps each slide's sceneId (52 total scenes across M0 and M4) to its dedicated component.
 */

// Module 0 Scenes (Orientation)
import Scene0_1 from './scenes/Scene0_1';
import Scene0_2 from './scenes/Scene0_2';
import Scene0_3 from './scenes/Scene0_3';
import Scene0_4 from './scenes/Scene0_4';
import Scene0_5 from './scenes/Scene0_5';
import Scene0_6 from './scenes/Scene0_6';
import * as M1Scenes from './scenes/M1Scenes';

// Module 4 Topic 1 Scenes
import Scene1_1 from './scenes/Scene1_1';
import Scene1_2 from './scenes/Scene1_2';
import Scene1_3 from './scenes/Scene1_3';
import Scene1_4 from './scenes/Scene1_4';
import Scene1_5 from './scenes/Scene1_5';

// Module 4 Topic 2 Scenes
import Scene2_1 from './scenes/Scene2_1';
import Scene2_2 from './scenes/Scene2_2';
import Scene2_3_1 from './scenes/Scene2_3_1';
import Scene2_3_2 from './scenes/Scene2_3_2';
import Scene2_3_3 from './scenes/Scene2_3_3';
import Scene2_3_4 from './scenes/Scene2_3_4';
import Scene2_3_5 from './scenes/Scene2_3_5';

// Module 4 Topic 3 Scenes
import Scene3_1 from './scenes/Scene3_1';
import Scene3_2 from './scenes/Scene3_2';
import Scene3_3_1 from './scenes/Scene3_3_1';
import Scene3_3_2 from './scenes/Scene3_3_2';
import Scene3_3_3 from './scenes/Scene3_3_3';
import Scene3_3_4 from './scenes/Scene3_3_4';

// Module 4 Topic 4 Scenes
import Scene4_1 from './scenes/Scene4_1';
import Scene4_2 from './scenes/Scene4_2';
import Scene4_3_1 from './scenes/Scene4_3_1';
import Scene4_3_2 from './scenes/Scene4_3_2';
import Scene4_3_3 from './scenes/Scene4_3_3';
import Scene4_3_4 from './scenes/Scene4_3_4';

// Module 4 Topic 5 Scenes
import Scene5_1 from './scenes/Scene5_1';
import Scene5_2 from './scenes/Scene5_2';
import Scene5_3_1 from './scenes/Scene5_3_1';
import Scene5_3_2 from './scenes/Scene5_3_2';
import Scene5_3_3 from './scenes/Scene5_3_3';
import Scene5_3_4 from './scenes/Scene5_3_4';
import Scene5_3_5 from './scenes/Scene5_3_5';
import Scene5_3_6 from './scenes/Scene5_3_6';
import Scene5_4 from './scenes/Scene5_4';

// Module 4 Topic 6 Scenes
import Scene6_1 from './scenes/Scene6_1';
import Scene6_2 from './scenes/Scene6_2';
import Scene6_3_1 from './scenes/Scene6_3_1';
import Scene6_3_2 from './scenes/Scene6_3_2';
import Scene6_3_3 from './scenes/Scene6_3_3';
import Scene6_3_4 from './scenes/Scene6_3_4';

// Module 4 Topic 7 Scenes
import Scene7_1 from './scenes/Scene7_1';
import Scene7_2 from './scenes/Scene7_2';
import Scene7_3_1 from './scenes/Scene7_3_1';
import Scene7_3_2 from './scenes/Scene7_3_2';
import Scene7_3_3 from './scenes/Scene7_3_3';
import Scene7_3_4 from './scenes/Scene7_3_4';
import Scene7_3_5 from './scenes/Scene7_3_5';

import SceneDefault from './scenes/SceneDefault';

export const SCENE_REGISTRY = {
  // Module 0
  scene_0_1: Scene0_1,
  scene_0_2: Scene0_2,
  scene_0_3: Scene0_3,
  scene_0_4: Scene0_4,
  scene_0_5: Scene0_5,
  scene_0_6: Scene0_6,

  // Module 4 Topic 1
  scene_1_1: Scene1_1,
  scene_1_2: Scene1_2,
  scene_1_3: Scene1_3,
  scene_1_4: Scene1_4,
  scene_1_5: Scene1_5,

  // Module 4 Topic 2
  scene_2_1: Scene2_1,
  scene_2_2: Scene2_2,
  scene_2_3_1: Scene2_3_1,
  scene_2_3_2: Scene2_3_2,
  scene_2_3_3: Scene2_3_3,
  scene_2_3_4: Scene2_3_4,
  scene_2_3_5: Scene2_3_5,

  // Module 4 Topic 3
  scene_3_1: Scene3_1,
  scene_3_2: Scene3_2,
  scene_3_3_1: Scene3_3_1,
  scene_3_3_2: Scene3_3_2,
  scene_3_3_3: Scene3_3_3,
  scene_3_3_4: Scene3_3_4,

  // Module 4 Topic 4
  scene_4_1: Scene4_1,
  scene_4_2: Scene4_2,
  scene_4_3_1: Scene4_3_1,
  scene_4_3_2: Scene4_3_2,
  scene_4_3_3: Scene4_3_3,
  scene_4_3_4: Scene4_3_4,
  scene_4_4: Scene4_3_4, // Backward compatibility alias

  // Module 4 Topic 5
  scene_5_1: Scene5_1,
  scene_5_2: Scene5_2,
  scene_5_3_1: Scene5_3_1,
  scene_5_3_2: Scene5_3_2,
  scene_5_3_3: Scene5_3_3,
  scene_5_3_4: Scene5_3_4,
  scene_5_3_5: Scene5_3_5,
  scene_5_3_6: Scene5_3_6,
  scene_5_4: Scene5_4,

  // Module 4 Topic 6
  scene_6_1: Scene6_1,
  scene_6_2: Scene6_2,
  scene_6_3_1: Scene6_3_1,
  scene_6_3_2: Scene6_3_2,
  scene_6_3_3: Scene6_3_3,
  scene_6_3_4: Scene6_3_4,

  // Module 4 Topic 7
  scene_7_1: Scene7_1,
  scene_7_2: Scene7_2,
  scene_7_3_1: Scene7_3_1,
  scene_7_3_2: Scene7_3_2,
  scene_7_3_3: Scene7_3_3,
  scene_7_3_4: Scene7_3_4,
  scene_7_3_5: Scene7_3_5,

  // Module 1 Scenes
  scene_m1_1_1: M1Scenes.SceneM1_1_1,
  scene_m1_1_2: M1Scenes.SceneM1_1_2,
  scene_m1_1_3: M1Scenes.SceneM1_1_3,
  scene_m1_1_4: M1Scenes.SceneM1_1_4,
  scene_m1_1_5: M1Scenes.SceneM1_1_5,

  scene_m1_2_1: M1Scenes.SceneM1_2_1,
  scene_m1_2_2: M1Scenes.SceneM1_2_2,
  scene_m1_2_3: M1Scenes.SceneM1_2_3,
  scene_m1_2_4: M1Scenes.SceneM1_2_4,
  scene_m1_2_5: M1Scenes.SceneM1_2_5,

  scene_m1_3_1: M1Scenes.SceneM1_3_1,
  scene_m1_3_2: M1Scenes.SceneM1_3_2,
  scene_m1_3_3: M1Scenes.SceneM1_3_3,
  scene_m1_3_4: M1Scenes.SceneM1_3_4,
  scene_m1_3_5: M1Scenes.SceneM1_3_5,

  scene_m1_4_1: M1Scenes.SceneM1_4_1,
  scene_m1_4_2: M1Scenes.SceneM1_4_2,
  scene_m1_4_3: M1Scenes.SceneM1_4_3,
  scene_m1_4_4: M1Scenes.SceneM1_4_4,
  scene_m1_4_5: M1Scenes.SceneM1_4_5,

  scene_m1_5_1: M1Scenes.SceneM1_5_1,
  scene_m1_5_2: M1Scenes.SceneM1_5_2,
  scene_m1_5_3: M1Scenes.SceneM1_5_3,
  scene_m1_5_4: M1Scenes.SceneM1_5_4,
  scene_m1_5_5: M1Scenes.SceneM1_5_5,

  scene_m1_6_1: M1Scenes.SceneM1_6_1,
  scene_m1_6_2: M1Scenes.SceneM1_6_2,
  scene_m1_6_3: M1Scenes.SceneM1_6_3,
  scene_m1_6_4: M1Scenes.SceneM1_6_4,
  scene_m1_6_5: M1Scenes.SceneM1_6_5
};

export { SceneDefault };

export default SCENE_REGISTRY;
