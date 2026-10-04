'use client'
import {useEffect} from 'react'
export function AdMobBanner({adUnitId}:{adUnitId:string}){useEffect(()=>{(window as any).adsbygoogle=(window as any).adsbygoogle||[];(window as any).adsbygoogle.push({})},[]);return <div>AdMob {adUnitId}</div>}
