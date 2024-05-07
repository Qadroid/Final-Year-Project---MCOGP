import { KUBECONFIG_BASE64 } from '$env/static/private';
import type { PageServerLoad } from './$types';
import * as k8s from '@kubernetes/client-node';

export const load: PageServerLoad = async () => {
    // const currentProject = 'admin'
    // const { data, error } = await supabase
    //     .from('projects')
    //     .select('name, kubeconfig')
    //     .eq('name', currentProject)
    //     .single()

    // console.log(data)

    // const { kubeconfig } = data[0].kubeconfig

    function getK8sClient(encodedKubeConfig: string) {
        const kubeConfigContent = Buffer.from(encodedKubeConfig, 'base64').toString('utf-8');
        const kubeConfig = new k8s.KubeConfig();
        kubeConfig.loadFromString(kubeConfigContent);
        return kubeConfig.makeApiClient(k8s.CoreV1Api);
    }

    const k8sClient = getK8sClient(KUBECONFIG_BASE64);

    function transformServiceData(rawServices) {
        return rawServices.map(service => ({
          name: service.metadata.name,
          namespace: service.metadata.namespace,
          creationTimestamp: service.metadata.creationTimestamp,
          clusterIP: service.spec.clusterIP,
          type: service.spec.type,
          ports: service.spec.ports.map(port => `${port.port}/${port.protocol}`).join(', '),
          selector: service.spec.selector,
          sessionAffinity: service.spec.sessionAffinity
        }));
      }
      

    let serviceListRaw
    let serviceList

    try {
        const serviceRes = await k8sClient.listNamespacedService('default');
        serviceListRaw = serviceRes.body.items
        serviceList = transformServiceData(serviceListRaw)
        // console.log(serviceList)
    } catch (err) {
        console.error(err);
    }

    return {
        serviceList: serviceList
    }
}