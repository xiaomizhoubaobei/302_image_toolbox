/**
 * @fileoverview 任务轮询模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供异步任务的轮询查询功能
 */

import { getToken } from "./token";
import { getTask } from "./storage";

/**
 * 获取 302AI 图片任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export const fetchTask = async (id: string) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 60;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/task/${id}/fetch`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            reject(data.error)
            return
          }
          if (data.status === 'succeeded') {
            resolve(data);
          } else if (data.status === 'failed') {
            reject('Task failed')
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 5000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
};

/**
 * 获取创意放大任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export const fetchCreativeUpscaleTask = async (id: string) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 60;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/upscale/creative/result/${id}`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Accept": "application/json"
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.errors) {
            reject(data.errors)
            return
          }
          if (data.finish_reason === 'SUCCESS') {
            resolve(data);
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 5000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
};

/**
 * 获取图片文字翻译任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export const fetchTranslateImageResult = async (id: string) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 60;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/image/translate/query`, {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            reject(data.error)
            return
          }
          if (data.body.result) {
            resolve(JSON.parse(data.body.result));
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.body) {
                setTimeout(() => fetchApi(id), 5000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
};

/**
 * 获取 Luma 视频任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export async function fetchLumaTask(id: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/luma/task/${id}/fetch`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            reject(data.error)
            return
          }
          if (data.state === 'completed') {
            resolve(data);
          } else if (data.state === 'failed') {
            reject('Task failed')
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 10000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
}

/**
 * 获取 Kling 视频任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export async function fetchKlingTask(id: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/klingai/task/${id}/fetch`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const video = data.data.works[0]?.resource.resource
          if (video) {
            resolve({ output: video });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 10000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
}

/**
 * 获取 Runway 视频任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export async function fetchRunwayTask(id: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/runway/task/${id}/fetch`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const video = data.task.artifacts[0]?.url
          if (video) {
            resolve({ output: video });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 10000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
}

/**
 * 获取 CogVideoX 视频任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export async function fetchCogTask(id: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/zhipu/api/paas/v4/async-result/${id}`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            reject(data.error)
            return
          }
          if (data.task_status === 'SUCCESS') {
            resolve({ output: data.video_result[0].url });
          } else if (data.state === 'failed') {
            reject('Task failed')
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.id) {
                setTimeout(() => fetchApi(id), 10000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
}

/**
 * 获取 Doc2x 文字识别任务结果
 * @param id - 任务 ID
 * @returns 任务结果
 */
export async function fetchDoc2xTask(id: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const fetchApi = (id: string) => {
      fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/doc2x/api/v1/async/status?uuid=${id}`, {
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.data.status === 'success') {
            const content = data.data.result.pages[0]?.md || ''
            resolve({ output: content });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const task = getTask()
              if (task.uuid) {
                setTimeout(() => fetchApi(id), 10000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    };
    fetchApi(id);
  });
}