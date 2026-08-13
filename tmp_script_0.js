
    if (typeof THREE !== 'undefined' && typeof THREE.CSS3DObject === 'undefined') {
      THREE.CSS3DObject = function (element) {
        THREE.Object3D.call(this);
        this.element = element || document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.pointerEvents = 'auto';
      };
      THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
      THREE.CSS3DObject.prototype.constructor = THREE.CSS3DObject;

      THREE.CSS3DRenderer = function () {
        const domElement = document.createElement('div');
        domElement.style.overflow = 'hidden';
        domElement.style.position = 'absolute';
        domElement.style.top = '0';
        domElement.style.left = '0';
        domElement.style.pointerEvents = 'none';
        this.domElement = domElement;

        const cameraElement = document.createElement('div');
        cameraElement.style.transformStyle = 'preserve-3d';
        cameraElement.style.pointerEvents = 'none';
        domElement.appendChild(cameraElement);

        this.setSize = function (width, height) {
          domElement.style.width = width + 'px';
          domElement.style.height = height + 'px';
          cameraElement.style.width = width + 'px';
          cameraElement.style.height = height + 'px';
        };

        function epsilon(value) { return Math.abs(value) < 1e-10 ? 0 : value; }
        function getCameraCSSMatrix(matrix) {
          const e = matrix.elements;
          return 'matrix3d(' + epsilon(e[0]) + ',' + epsilon(-e[1]) + ',' + epsilon(e[2]) + ',' + epsilon(e[3]) + ',' +
            epsilon(e[4]) + ',' + epsilon(-e[5]) + ',' + epsilon(e[6]) + ',' + epsilon(e[7]) + ',' +
            epsilon(e[8]) + ',' + epsilon(-e[9]) + ',' + epsilon(e[10]) + ',' + epsilon(e[11]) + ',' +
            epsilon(e[12]) + ',' + epsilon(-e[13]) + ',' + epsilon(e[14]) + ',' + epsilon(e[15]) + ')';
        }

        function getObjectCSSMatrix(matrix) {
          const e = matrix.elements;
          return 'translate(-50%,-50%) matrix3d(' +
            epsilon(e[0]) + ',' + epsilon(e[1]) + ',' + epsilon(e[2]) + ',' + epsilon(e[3]) + ',' +
            epsilon(-e[4]) + ',' + epsilon(-e[5]) + ',' + epsilon(-e[6]) + ',' + epsilon(-e[7]) + ',' +
            epsilon(e[8]) + ',' + epsilon(e[9]) + ',' + epsilon(e[10]) + ',' + epsilon(e[11]) + ',' +
            epsilon(e[12]) + ',' + epsilon(e[13]) + ',' + epsilon(e[14]) + ',' + epsilon(e[15]) + ')';
        }

        function renderObject(object, cameraCSSMatrix) {
          if (object instanceof THREE.CSS3DObject) {
            const style = getObjectCSSMatrix(object.matrixWorld);
            const element = object.element;
            element.style.transform = style;
            if (element.parentNode !== cameraElement) cameraElement.appendChild(element);
          }
          for (let i = 0; i < object.children.length; i++) {
            renderObject(object.children[i], cameraCSSMatrix);
          }
        }

        this.render = function (scene, camera) {
          const fov = camera.projectionMatrix.elements[5] * (window.innerHeight / 2);
          domElement.style.perspective = fov + 'px';
          camera.updateMatrixWorld();
          scene.updateMatrixWorld();
          const cameraCSSMatrix = 'translateZ(' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse);
          cameraElement.style.transform = cameraCSSMatrix;
          renderObject(scene, cameraCSSMatrix);
        };
      };
    }
  