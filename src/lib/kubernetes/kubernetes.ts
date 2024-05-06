import { firestore } from '@/firebase';
import k8s from '@kubernetes/client-node'
import { getDoc, doc } from 'firebase/firestore';
import { writable } from 'svelte/store'

const kc = writable(new k8s.KubeConfig())

async function loadKubeConfig( projectId: string ) {
    
    const projectRef = doc(firestore, 'projects', projectId)
    const project = await getDoc(projectRef);
  
    if (project.data.length !== 0) {
        const kubeconfig = project.data().kubeconfig; project.data
    
        kc.update(kc => {
        kc.loadFromString(kubeconfig);
        return kc;
        });
  } else {
    console.log('No such document!');
  }
}

const filePath = 'src/lib/kubernetes/k3s.yaml'

kc.loadFromFile(filePath)

const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

const main = async () => {
    try {
        const podsRes = await k8sApi.listNamespacedPod('default')
        console.log(podsRes.body)
    } catch (err) {
        console.error(err)
    }
}

export { main }