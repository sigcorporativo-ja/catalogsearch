export const METADATA_TEMPLATE =
	`<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:gts="http://www.isotc211.org/2005/gts"
		xmlns:gco="http://www.isotc211.org/2005/gco"
		xmlns:gml="http://www.opengis.net/gml"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xmlns:gmd="http://www.isotc211.org/2005/gmd"
		xmlns:srv="http://www.isotc211.org/2005/srv"
		xmlns:csw="http://www.opengis.net/cat/csw"
		xmlns:geonet="http://www.fao.org/geonetwork">
		<xsl:template match="/">

			<div class="feed">
				<div class="feedTitle">
					<h1 class="feedTitleText cabecera">
							<span class="help-content" id="tip.iso19139|gmd:identificationInfo">Información de la identificación</span>
					</h1>
				</div>
				<div class="feedContent">
					<table>
						<tbody>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:title">Título</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:date">Fecha</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:DateTime"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:dateType">Tipo de fecha</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:edition">Edición</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:edition/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:presentationForm">Formulario de preseintación</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:presentationForm/gmd:CI_PresentationFormCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:abstract">Resumen</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:purpose">Propósito</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:purpose/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:status">Estado</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:status/gmd:MD_ProgressCode/@codeListValue"/>
								</td>
							</tr>
							<xsl:for-each select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact">
								<tr>
									<td colspan="2" class="padded-content">
										<div class="feedEntry">
											<h3 class="feedEntryTitle cabecera">
												<span  class="help-content" id="tip.iso19139|gmd:pointOfContact">Punto de contacto</span>
											</h3>
											<div class="feedEntryContent">
												<table>
													<tbody>
														<tr>
															<th class="md" valign="top">
																<span  id="tip.iso19139|gmd:individualName">Nombre individual</span>
															</th>
															<td class="padded" valign="top">
																<xsl:value-of select="gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"/>
															</td>
														</tr>
														<tr>
															<th class="md" valign="top">
																<span  id="tip.iso19139|gmd:organisationName">Nombre de la organización</span>
															</th>
															<td class="padded" valign="top">
																<xsl:value-of select="gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString"/>
															</td>
														</tr>
														<tr>
															<th class="md" valign="top">
																<span  id="tip.iso19139|gmd:positionName">Función del contacto</span>
															</th>
															<td class="padded" valign="top">
																<xsl:value-of select="gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString"/>
															</td>
														</tr>
														<tr>
															<th class="md" valign="top">
																<span  id="tip.iso19139|gmd:role">Cargo</span>
															</th>
															<td class="padded" valign="top">
																<xsl:value-of select="gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue"/>
															</td>
														</tr>
														<tr>
															<td colspan="2" class="padded-content">
																<div class="feedEntryContent">

																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</td>
								</tr>
							</xsl:for-each>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:maintenanceAndUpdateFrequency">Frecuencia de mantenimento y actualización</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue"/>
								</td>
							</tr>
							<xsl:for-each select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:descriptiveKeywords">
								<tr>
									<th class="md" valign="top">
										<span  id="tip.iso19139|gmd:descriptiveKeywords">Palabras clave descriptivas</span>
									</th>
									<td class="padded" valign="top">
										<xsl:for-each select="gmd:MD_Keywords/gmd:keyword">
											<xsl:value-of select="gco:CharacterString"/>&#160;
										</xsl:for-each>
									</td>
								</tr>
							</xsl:for-each>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:accessConstraints">Restricciones Legales de los datos</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints/gmd:MD_LegalConstraints/gmd:accessConstraints/gmd:MD_RestrictionCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:useConstraints">Limitaciones de uso</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints/gmd:MD_LegalConstraints/gmd:useConstraints/gmd:MD_RestrictionCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:otherConstraints">Otras limitaciones</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints/gmd:MD_LegalConstraints/gmd:otherConstraints/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:spatialRepresentationType">Tipo de representación espacial</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialRepresentationType/gmd:MD_SpatialRepresentationTypeCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<td colspan="2" class="padded-content">
									<div class="feedEntry">
										<h3 class="feedEntryTitle cabecera">
											<span  class="help-content" id="tip.iso19139|gmd:equivalentScale">Escala equivalente</span>
										</h3>
										<div class="feedEntryContent">
											<table>
												<tbody>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:denominator">Denominador</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialResolution/gmd:MD_Resolution/gmd:equivalentScale/gmd:MD_RepresentativeFraction/gmd:denominator/gco:Integer"/>
														</td>
													</tr>
												</tbody>
											</table>
										</div><!-- div class="feedEntryContent" -->
									</div><!-- div class="feedEntry" -->
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:language">Idioma</span>
								</th>
								<td class="padded" valign="top">
										<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:language/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:characterSet">Conjunto de caracteres</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:characterSet/gmd:MD_CharacterSetCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:MD_TopicCategoryCode">Categoría del tema</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:topicCategory/gmd:MD_TopicCategoryCode"/>
								</td>
							</tr>
							<tr>
								<td colspan="2" class="padded-content">
									<div class="feedEntry">
										<h3 class="feedEntryTitle cabecera">
											<span  class="help-content" id="tip.iso19139|gmd:extent">Extensión</span>
										</h3>
										<div class="feedEntryContent">
											<div class="feedEntry2">
												<h3 class="feedEntry2Title cabecera">
													<span  class="help-content" id="tip.iso19139|gmd:EX_TemporalExtent">Extensión temporal</span>
												</h3>
												<div class="feedEntry2Content">
													<table>
														<tbody>
															<tr>
																<th class="md" valign="top">
																	<span  id="tip.iso19139|gml:beginPosition">Fecha de inicio</span>
																</th>
																<td class="padded" valign="top">
																	<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:beginPosition"/>
																</td>
															</tr>
															<tr>
																<th class="md" valign="top">
																	<span  id="tip.iso19139|gml:endPosition">Fecha de fin</span>
																</th>
																<td class="padded" valign="top">
																	<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:endPosition"/>
																</td>
															</tr>
														</tbody>
													</table>
												</div><!-- div class="feedEntry2Content" -->
											</div><!-- div class="feedEntry2" -->
										</div><!-- div class="feedEntryContent" -->
									</div><!-- div class="feedEntry" -->
								</td>
							</tr>
							<tr>
								<td colspan="2" class="padded-content">
									<div class="feedEntry">
										<h3 class="feedEntryTitle cabecera">
											<span  class="help-content" id="tip.iso19139|gmd:extent">Extensión</span>
										</h3>
										<div class="feedEntryContent">
											<div class="feedEntry2">
												<h3 class="feedEntry2Title cabecera">
													<span  class="help-content" id="tip.iso19139|gmd:EX_GeographicBoundingBox">Límites geográficos</span>
												</h3>
												<div class="feedEntry2Content">
													<table>
														<tbody>
															<tr xmlns:gml="http://www.opengis.net/gml" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:gmx="http://www.isotc211.org/2005/gmx">
																<td align="center">
																	<table>
																		<tbody>
																			<tr>
																				<td></td>
																				<td class="padded" align="center">
																					<b>
																						<span  id="tip.iso19139|gmd:northBoundLatitude">Norte </span>
																					</b>
																					<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal"/>
																				</td>
																				<td></td>
																			</tr>
																			<tr>
																				<td class="padded" align="center">
																					<b>
																						<span  id="tip.iso19139|gmd:westBoundLongitude">Oeste </span>
																					</b>
																					<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal"/>
																				</td>
																				<td></td>
																				<td class="padded" align="center">
																					<b>
																						<span  id="tip.iso19139|gmd:eastBoundLongitude">Este </span>
																					</b>
																					<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal"/>
																				</td>
																			</tr>
																			<tr>
																				<td></td>
																				<td class="padded" align="center">
																					<b>
																						<span  id="tip.iso19139|gmd:southBoundLatitude">Sur </span>
																					</b>
																					<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal"/>
																				</td>
																				<td></td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</div><!--div class="feedEntry2Content" -->
											</div><!--div class="feedEntry2"-->
										</div><!--div class="feedEntryContent"-->
									</div><!--div class="feedEntry"-->
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:supplementalInformation">Información adicional</span>
								</th>
								<td class="padded" valign="top">
										<xsl:value-of select="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:supplementalInformation/gco:CharacterString"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div><!--div class="feedContent"-->
			</div><!--div class="feed"-->

			<div class="feed">
				<div class="feedTitle">
					<h1 class="feedTitleText cabecera">
						<span  class="help-content" id="tip.iso19139|gmd:distributionInfo">Información de distribución</span>
					</h1>
				</div>
				<xsl:for-each select="gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:transferOptions/gmd:MD_DigitalTransferOptions/gmd:onLine">
				<div class="feedContent">
					<div class="feedEntry">
						<h3 class="feedEntryTitle cabecera">Recurso online</h3>
						<div class="feedEntryContent">
							<table>
								<tbody>
									<tr>
										<th class="md" valign="top">
											<span  id="tip.iso19139|gmd:CI_OnlineResource">URL</span>
										</th>
										<td class="padded" valign="top">
											<xsl:value-of select="gmd:CI_OnlineResource/gmd:linkage/gmd:URL"/>
										</td>
									</tr>
									<tr>
										<th class="md" valign="top">
											<span  id="tip.iso19139|gmd:CI_OnlineResource">Protocolo</span>
										</th>
										<td class="padded" valign="top">
											<xsl:value-of select="gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString"/>
										</td>
									</tr>
									<tr>
										<th class="md" valign="top">
											<span  id="tip.iso19139|gmd:CI_OnlineResource">Nombre</span>
										</th>
										<td class="padded" valign="top">
											<xsl:value-of select="gmd:CI_OnlineResource/gmd:name/gco:CharacterString"/>
										</td>
									</tr>
									<tr>
										<th class="md" valign="top">
											<span  id="tip.iso19139|gmd:CI_OnlineResource">Descripción</span>
										</th>
										<td class="padded" valign="top">
											<xsl:value-of select="gmd:CI_OnlineResource/gmd:description/gco:CharacterString"/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				</xsl:for-each>
			</div><!-- Fin de div class="feed"-->

			<div class="feed">
				<div class="feedTitle">
					<h1 class="feedTitleText cabecera">
							<span  class="help-content" id="tip.iso19139|gmd:referenceSystemInfo">Información del sistema de referencia</span>
					</h1>
				</div>
				<div class="feedContent">
					<table>
						<tbody>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:code">Código</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:referenceSystemInfo/gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gco:CharacterString"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div><!--div class="feedContent"-->
			</div><!--div class="feed"-->

			<div class="feed">
				<div class="feedTitle">
					<h1 class="feedTitleText cabecera">
						<span  class="help-content" id="tip.iso19139|gmd:dataQualityInfo">Información de la calidad de los datos</span>
					</h1>
				</div>
				<div class="feedContent">
					<table>
						<tbody>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:level">Ámbito</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:scope/gmd:DQ_Scope/gmd:level/gmd:MD_ScopeCode/@codeListValue"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div><!--div class="feedContent"-->
			</div><!--div class="feed"-->


			<div class="feed">
				<div class="feedTitle">
					<h1 class="feedTitleText cabecera">
						Metadato
					</h1>
				</div>
				<div class="feedContent">
					<table>
						<tbody>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:fileIdentifier">Identificador del archivo</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:language">Idioma</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:language/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:characterSet">Conjunto de caracteres</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:characterSet/gmd:MD_CharacterSetCode/@codeListValue"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:dateStamp">Fecha</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:dateStamp/gco:DateTime"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
										<span  id="tip.iso19139|gmd:metadataStandardName">Nombre del estándar de los Metadatos</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:metadataStandardName/gco:CharacterString"/>
								</td>
							</tr>
							<tr>
								<th class="md" valign="top">
									<span  id="tip.iso19139|gmd:metadataStandardVersion">Versión del estándar de los Metadatos</span>
								</th>
								<td class="padded" valign="top">
									<xsl:value-of select="gmd:MD_Metadata/gmd:metadataStandardVersion/gco:CharacterString"/>
								</td>
							</tr>

							<tr>
								<td colspan="2" class="padded-content">
									<div class="feedEntry">
										<h3 class="feedEntryTitle cabecera">
											<span  class="help-content" id="tip.iso19139|gmd:contact">Autor del metadato</span>
										</h3>
										<div class="feedEntryContent">
											<table>
												<tbody>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:individualName">Nombre individual</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:organisationName">Nombre de la organización</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:positionName">Cargo</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:deliveryPoint">Punto de entrega</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:deliveryPoint/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:city">Ciudad</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:city/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:administrativeArea">Área administrativa</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:administrativeArea/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:postalCode">Código postal</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:postalCode/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:country">País</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:country/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:electronicMailAddress">Dirección de correo electrónico</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"/>
														</td>
													</tr>
													<tr>
														<th class="md" valign="top">
															<span  id="tip.iso19139|gmd:role">Rol</span>
														</th>
														<td class="padded" valign="top">
															<xsl:value-of select="gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue"/>
														</td>
													</tr>
												</tbody>
											</table>
										</div><!--div class="feedEntryContent"-->
									</div><!--div class="feedEntry"-->
								</td>
							</tr>
						</tbody>
					</table>
				</div><!--div class="feedContent"-->
			</div><!--div class="feed"-->

		</xsl:template>
	</xsl:stylesheet>`;