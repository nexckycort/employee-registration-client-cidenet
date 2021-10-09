import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import { AreaDTO, CountryDTO, IDTypesDTO } from 'infrastructure/dto/ShareDTO'
import { countryService } from 'domain/services/countryService'
import { idTypesService } from 'domain/services/idTypesService'
import { areaService } from 'domain/services/areaService'
import useSelect from './useSelect'
import { useRouter } from 'infrastructure/ui/hooks'

const useSearchInfoSelect = () => {
  const router = useRouter()

  const [country, setCountry] = useState<CountryDTO[]>([])
  const [idtype, setIDType] = useState<IDTypesDTO[]>([])
  const [area, setArea] = useState<AreaDTO[]>([])
  const [error, setError] = useState(false)

  const { Select: SelectCountry } = useSelect('Country', country)
  const { Select: SelectIDType } = useSelect('ID Type', idtype)
  const { Select: SelectArea } = useSelect('Area', area)

  const searchInfoSelect = async () => {
    const consult = []

    consult.push(countryService.getAll())
    consult.push(idTypesService.getAll())
    consult.push(areaService.getAll())

    const [countryResponse, idTypesResponse, areaResponse] = await Promise.all(consult)

    if (countryResponse.error || idTypesResponse.error || areaResponse.error) return setError(true)

    setCountry(countryResponse.response.data)
    setIDType(idTypesResponse.response.data)
    setArea(areaResponse.response.data)
  }

  const alert = (title: string, type: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') => {
    void Swal.fire({
      position: 'top-end',
      icon: type,
      title: title,
      showConfirmButton: false,
      timer: 2500
    }).then(() => {
      router.push('/')
    })
  }

  if (error) alert("Oops, we couldn't load the view, please try later", 'error')

  useEffect(() => {
    void searchInfoSelect()
  }, [])

  return {
    SelectCountry,
    SelectIDType,
    SelectArea
  }
}

export default useSearchInfoSelect
